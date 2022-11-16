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
	randomShare,
	recover,
	recoverFull
}

type tPoint = [bigint, bigint]

function share(secret:bigint, t:number, n:number = 255):Array<tPoint> {
	if (t < 2 || t > n || n > 255) {
		throw new Error("threshold must be at least 2, number of shares at most 255")
	}
	const polynom:Array<bigint> = makePolynomial(t - 2)
	const shares:Array<tPoint> = getPoints(polynom, n + 1).slice(1)
	shares.forEach(p => {
		p[1] *= p[0]
		p[1] += secret
	})
	return shares
}

function randomShare(secret:bigint, t:number, n:number):Array<tPoint> {
	const shares = share(secret, t)
	return randomPoints(shares, n)
}

function recover(shares:Array<tPoint>, t:number = shares.length):bigint {
	return interpolate(shares.slice(0, t))
}


function recoverFull(shares:Array<tPoint>, thresh:number = shares.length):Array<bigint> {
	const polynom:Array<bigint> = []
	const copy = shares.slice(0, thresh)
	for (let i = thresh; i > 0; i--) {
		const recovered:bigint = recover(copy, i)
		polynom.push(recovered)
		copy.forEach(s => {
			s[1] -= recovered
			s[1] /= s[0]		
		})
		console.log(`coefficient ${255 - i} recovered`)
	}
	return polynom
}


