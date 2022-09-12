const { combinePoints } = require('./lagrange.js')

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

function random () {
	//placeholder random function
	return Math.random()
}

/**
 *  generates a degree t polynomial with random coefficients
 * @returns Array<integers>
 * */
function createRandomPolynomial (t, polynom = []) {
	if (polynom.length < t - 1) {
		polynom.push(Math.floor(Math.random()*100000000))
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
	let y = 0
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
	if (points.length < 255) {
		const x = points.length
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
		num = Math.floor(random() * points.length)
		p = [num, points[num]]
		array.push(p)
		return randomPoints(t, points, array)
	}
	return array
}

