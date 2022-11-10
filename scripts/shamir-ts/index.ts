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

function random (num = 32) {
	return BigInt('0x'+ crypto.randomBytes(num).toString('hex'))
}

/**
 *  generates a degree t polynomial with random coefficients
 * @returns Array<integers>
 * */
function createRandomPolynomial (t, polynom = []) {
	if (polynom.length < t - 1) {
		polynom.push(random())
		return createRandomPolynomial(t, polynom)
	}

	return polynom
}

/**
 * adds the secret to the polynomial
 * */
function addSecret (x, polynom) {
	polynom.unshift(x)
	return polynom
}

/**
 * returns the y points of the first 256 points
 * */
function getY (polynom, x) {
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
function getPoints (polynom, points = []) {
	if (points.length < 256) {
		const x = BigInt(points.length)
		points.push(getY(polynom, x))
		return getPoints(polynom, points)
	}

	return points
}

/**
 * returns a threshold of points
 * */

function randomPoints (t, points, array = []) {
	if (array.length < t) {
		const num = Math.floor(Math.random() * points.length)
		p = [BigInt(num), points[num]]
		if (!array.some(elem => elem[0] === p[0])) {
			array.push(p)
		}
		return randomPoints(t, points, array)
	}
	return array
}

