const { combinePoints } = require('../lagrange.js')
const crypto = require('crypto')

module.exports = {
	random,
	createRandomPolynomial,
	randomPoints,
	addSecret,
	getPoints,
	combinePoints,
}

/**
 * Generates a random number
 * @returns float
 * */

function random (num: number = 32): bigint {
	return BigInt('0x'+ crypto.randomBytes(num).toString('hex'))
}

/**
 *  generates a degree t polynomial with random coefficients
 * @returns Array<integers>
 * */
function createRandomPolynomial (t: number, polynom: Array<bigint> = []): Array<bigint> {
	if (polynom.length < t - 1) {
		polynom.push(random())
		return createRandomPolynomial(t, polynom)
	}

	return polynom
}

/**
 * adds the secret to the polynomial
 * */
function addSecret (x: bigint, polynom: Array<bigint>): Array<bigint> {
	polynom.unshift(x)
	return polynom
}

/**
 * returns the y points of the first 256 points
 * */
function getY (polynom:Array<bigint>, x:bigint): bigint {
	let y = 0n
	let i = polynom.length - 1
	while (i >= 0) {
		y *= x
		y += polynom[i]
		i--
	}
	return y
}

/**
 * returns an array of arrays that have the x index and the y value
 * */

function getPoints (polynom:Array<bigint>, points:Array<bigint>= []): Array<bigint> {
	const pointsCopy = [...points]
	if (pointsCopy.length < 256) {
		const x = BigInt(pointsCopy.length)
		pointsCopy.push(getY(polynom, x))
		return getPoints(polynom, pointsCopy)
	}

	return pointsCopy
}

/**
 * returns a threshold of points
 * */

type tPoints = [bigint, bigint]

function randomPoints (t: number, points: Array<bigint>, array:Array<tPoints> = []): Array<tPoints> {
	if (points.length === 0) throw new Error('points array is empty')
	if (array.length < t) {
		const num = Math.floor(Math.random() * points.length)
		const p = [BigInt(num), points[num]]
		if (!array.some(elem => elem[0] === p[0])) {
		// TODO: try to remove ts ignore line bellow and fix error
		//@ts-ignore: next line
			array.push(p)
		}
		return randomPoints(t, points, array)
	}
	return array
}

