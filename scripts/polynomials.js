const crypto = require('crypto')

module.exports = {
	makePolynomial,
	getPoints,
	randomPoints
}

function plug(x, polynom) {
	let y = 0n
	const copy = []
	polynom.forEach(elem => copy.push(elem))
	while (copy.length > 0) {
		y *= x
		y += copy.pop()
	}
	return y
}

function makePolynomial(num) {
	const polynom = []
	while (polynom.length <= num) {
		polynom.push(BigInt('0x' + crypto.randomBytes(32).toString('hex')))
	}
	return polynom
}

function getPoints(polynom, n = 256) {
	const points = []
	while (points.length <= n) {
		const p = []
		const x = BigInt(points.length)
		const y = plug(x, polynom)
		p.push(x)
		p.push(y)
		points.push(p)
	}
	return points
}

function randomPoints(points, n) {
	const copy = []
	points.forEach(p => copy.push(p))
	while (copy.length > n) {
		let num = Math.ceil(copy.length / 256)
		const rando = parseInt(crypto.randomBytes(num).toString('hex'))
		if (rando < copy.length) {
			copy.splice(rando, 1)
		}
	}
	return copy
}