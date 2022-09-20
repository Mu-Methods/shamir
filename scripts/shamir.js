const { random, arrayOf } = require('./utilities')
const { combinePoints } = require('./lagrange.js')
const { recoverFrom } = require('./quickLagrange.js')
const { 
	createRandomPolynomial,
	getPoints,
	randomPoints
} = require('./polynomial.js')

module.exports = {
	addSecret,
	createShares,
	random,
	arrayOf,
	combinePoints,
	recoverFrom,
	createRandomPolynomial,
	getPoints,
	randomPoints
}

/**
 * createRandomPolynomial of degree t-1
 * addSecret to the polynomial
 * get n points or shares from the polynomial
 * default number of shares is 255
 * default x coordinates of n shares are 1 through n 
 * provide an array for custom selection of x coordinates*/
function createShares(secret, t, n = 255, array = arrayOf(n)) {
	shares = []
	const polynom = createRandomPolynomial(t - 1)
	polynom.unshift(secret)
	const points = getPoints(polynom)
	array.forEach(elem => {
		shares.push(points[elem])
	})
	return shares
}


/**
 * adds the secret to the polynomial
 * */
function addSecret (x, polynom) {
	polynom.unshift(x)
	return polynom
}

/**
 * removes the secret from the polynomial*/
function removeSecret(polynom) {
	polynom.shift()
	return polynom
}
