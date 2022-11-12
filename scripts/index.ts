/**
 * given secret x, threshold t, and number of shares n
 * generate a random polynomial of degree t-1: array of coeefficients
 * generate t-2 random coefficients, secret is the last coefficient
 * get points from the polynomial
 * (encrypt the points)
 * combine the points to recover the secret
*/
const { interpolate } = require('./interpolation.js')
const { makePolynomial, getPoints, randomPoints } = require('./polynomials.js')
module.exports = {
	share,
	randomShares,
	recover,
	recoverFull
}

type tPoint = [bigint, bigint]

function share(secret:bigint, t:number, n:number = 255):Array<tPoint> {
	if (t < 2 || t > n || n > 255) {
		throw new Error("threshold too small")
	}
	const polynom:Array<bigint> = makePolynomial(t - 2)
	const points:Array<tPoint> = getPoints(polynom, n).slice(1)
	const shares:Array<tPoint> = []
	points.forEach(p => {
		const point:tPoint = [0n, 0n]
		point[0] = p[0]
		point[1] = p[0] * p[1] + secret
		shares.push(point)
	})
	return shares
}

function randomShares(shares:Array<tPoint>, n:number = 255):Array<tPoint> {
	return randomPoints(shares, n)
}

function recover(shares:Array<tPoint>, t:number = shares.length):bigint {
	return interpolate(shares.slice(0, t))
}

function recoverFull(shares:Array<tPoint>, t:number = shares.length, polynom:Array<bigint> = []) {
	const recovered:bigint = interpolate(shares.slice(0, t))
	if (polynom.length < t) {
		polynom.push(recovered)
	} else {
		return polynom
	}
	const copy:Array<tPoint> = []
	shares.forEach(share => copy.push(share))
	copy.pop()
	copy.forEach(share => {
		const x:bigint = share[0]
		const y:bigint = (share[1] - recovered) / x
	})
	return recoverFull (copy, t - 1, polynom)
}

