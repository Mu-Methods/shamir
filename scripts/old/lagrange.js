const { scalePolynom, addPolynoms, multiplyPolynoms } = require('./polynomial.js')
//points are arrays of the form [x, y]

//for each point [x_j, y_j], calculate the constant (x_j - x_i) for each x_i !== x_j 
//and multiply them all together
const getDivisors = (points) => {
	const divisors = []
	points.forEach((p, i) => {
		let divisor = 1n
		points.forEach((q, j) => {
			if (j !== i) {
				divisor *= p[0] - q[0]
			}
		})
		divisors[i] = divisor
	})
	return divisors
}


const getPolynoms = (points) => {
	const polynoms = []
	points.forEach((p, i) => {
		let polynom = [1n]
		points.forEach((q, j) => {
			if (j !== i) {
				const factor = [-q[0], 1n]
				polynom = multiplyPolynoms(polynom, factor)
			}
		})
		polynom = polynom.map(elem => elem*p[1])
		polynoms[i] = polynom
	})
	return polynoms
}

const combinePolynoms = (polynoms, divisors) => {
	let combinedPolynom = [0n]
	polynoms.forEach((p, i) => {
		let c = 1n
		divisors.forEach((d, j) => {
			if (j !== i) {
				c *= d
			}
		})
		const polynom = p.map(elem => elem * c)
		combinedPolynom = addPolynoms(combinedPolynom, polynom)
	})

	let combinedDivisor = 1n
	divisors.forEach(d => combinedDivisor *= d)
	combinedPolynom = combinedPolynom.map(elem => elem / combinedDivisor)
	return combinedPolynom
}

const combinePoints = (points) => {
	const divisors = getDivisors(points)
	const polynoms = getPolynoms(points)
	return combinePolynoms(polynoms, divisors)
}

exports.getDivisors = getDivisors
exports.getPolynoms = getPolynoms
exports.combinePolynoms = combinePolynoms

exports.combinePoints = combinePoints