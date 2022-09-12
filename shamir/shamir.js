const { combinePoints } = require('./lagrange.js')

const random  = () => {
	//placeholder random function
	return Math.random()
}

const randomPolynomial = (t, polynom = []) => {
	if (polynom.length < t - 1) {
		polynom.push(Math.floor(Math.random()*100000000))
		return randomPolynomial(t, polynom)
	}

	return polynom
}

const addSecret = (x, polynom) => {
	polynom.unshift(x)
	return polynom
}

const getY = (polynom, x) => {
	let y = 0
	let i = polynom.length - 1
	while (i >= 0) {
		y *= x
		y += polynom[i]
		i--
	}
	return y
}

const getPoints = (polynom, points = []) => {
	if (points.length < 255) {
		const x = points.length
		points.push(getY(polynom, x))
		return getPoints(polynom, points)
	}

	return points
}

const randomPoints = (t, points, array = []) => {
	if (array.length < t) {
		num = Math.floor(random() * points.length)
		p = [num, points[num]]
		array.push(p)
		return randomPoints(t, points, array)
	}
	return array
}


//test
const thresh = 3
const testPolynom = addSecret(Math.floor(random()*100000000), randomPolynomial(thresh))
const testPoints = getPoints(testPolynom)
const shares = randomPoints(thresh, testPoints)
const recovered = combinePoints(shares)


console.log('secret:')
console.log(testPolynom)
console.log('\n')
console.log('shares:')
console.log(shares)
console.log('\n')
console.log('recovered:')
console.log(recovered)

