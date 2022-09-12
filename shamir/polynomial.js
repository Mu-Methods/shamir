//every polynomial can be represented as an array of coefficients, with the index representing the degree of x.
//the degree of the polynomial and 1 less than the length of the array should agree. Thus, cut off terminal 0s (not technically necessary?)
//degree = polynom.length - 1
const scalePolynom = (polynom, num) => {
	return polynom.map(x => x*num)
}

const addPolynoms = (p, q) => {
	const polynom = []
	polynom.length = Math.max(p.length, q.length)
	polynom.fill(0)
	
	p.forEach((elem, i) => {
		polynom[i] += elem
	})

	q.forEach((elem, i) => {
		polynom[i] += elem
	})

	return polynom
}

const multiplyPolynoms = (p, q) => {
	const polynom = []
	polynom.length = p.length + q.length - 1
	polynom.fill(0)

	p.forEach((elem, i) => {
		q.forEach((flem, j) => {polynom[i + j] += elem * flem
		})
	})

	return polynom
}

exports.scalePolynom = scalePolynom
exports.addPolynoms = addPolynoms
exports.multiplyPolynoms = multiplyPolynoms