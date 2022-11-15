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
	const shares:Array<tPoint> = getPoints(polynom, n + 1).slice(1)
	shares.forEach(p => {
		p[1] *= p[0]
		p[1] += secret
	})
	return shares
}

function randomShares(shares:Array<tPoint>, n:number = 255):Array<tPoint> {
	return randomPoints(shares, n)
}

function recover(shares:Array<tPoint>, t:number = shares.length):bigint {
	return interpolate(shares.slice(0, t))
}

function recoverFull(shares:Array<tPoint>, thresh:number = shares.length, polynom:Array<bigint> = []):Array<bigint> {
	if (polynom.length === thresh) {
		return polynom
	}
	const recovered:bigint = recover(shares.slice(0, thresh - polynom.length))
	polynom.push(recovered)
	const copy:Array<tPoint> = shares.slice(0, thresh - polynom.length)
	copy.forEach(s => {
		s[1] -= recovered
		s[1] /= s[0]		
	})
	return recoverFull (copy, thresh, polynom)
}

