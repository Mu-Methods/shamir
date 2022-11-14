const { random } = require('./utilities.js')

module.exports = {
	createRandomPolynomial,
	scalePolynom,
	addPolynoms,
	multiplyPolynoms,
	getY,
	getPoints,
	randomPoints
}
/**
 * polynomials are arrays of BigInts
 * the index is the degree, the value is the coefficient
 * example: 7x^3 + 5x^2 + 3x + 2 ==> [2n, 3n, 5n, 7n]
 * points are arrays of the form [x, y] where x and y are BigInts
 * example: y-intercept of above example is [0, 2]
 * */


function createRandomPolynomial (n, polynom = []) {
	if (polynom.length < n) {
		polynom.push(random())
		return createRandomPolynomial(n, polynom)
	}

	return polynom
}

function scalePolynom (polynom, num) {
	return polynom.map(x => x*BigInt(num))
}

function addPolynoms (p, q) {
	const polynom = []
	polynom.length = Math.max(p.length, q.length)
	polynom.fill(0n)
	
	p.forEach((elem, i) => {
		polynom[i] += BigInt(elem)
	})

	q.forEach((elem, i) => {
		polynom[i] += BigInt(elem)
	})

	return polynom
}

function multiplyPolynoms (p, q) {
	const polynom = []
	polynom.length = p.length + q.length - 1
	polynom.fill(0n)

	p.forEach((elem, i) => {
		q.forEach((flem, j) => {polynom[i + j] += elem * flem
		})
	})

	return polynom
}

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

function getPoints (polynom, points = []) {
	if (points.length < 256) {
		const x = BigInt(points.length)
		points.push([x, getY(polynom, x)])
		return getPoints(polynom, points)
	}

	return points
}

function randomPoints (t, points, array = []) {
	if (array.length < t) {
		const num = Math.floor(Math.random() * points.length)
		p = points[num]
		if (!array.some(elem => elem[0] === p[0])) {
			array.push(p)
		}
		return randomPoints(t, points, array)
	}
	return array
}