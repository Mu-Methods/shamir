/**
 * points are arrays of two bigints
 * type point = [bigint, bigint]
*/

/**
 * given points
 * 
*/

const bigMath = require('./bigMath.js')

type tPoint = [bigint, bigint]
type tFrac = [bigint, bigint]

function getLagrangeFrac(point:tPoint, points:Array<tPoint>):tFrac {
	if (point[0] === 0n) {
		throw new Error(`bad point:\n x = ${point[0]}\n y = ${point[1]}`)
	}
	let frac = bigMath.newFrac(1n, point[1])
	points.forEach(p => {
		if (point[0] !== p[0]) {
			let f = bigMath.newFrac(p[0] - point[0], p[0])
			frac = bigMath.multiplyFrac(frac, f)
		}
	})

	return frac
}

export function interpolate(points:Array<tPoint>):bigint {
	let sum = [1n, 0n]
	points.forEach(p => {
		sum = bigMath.addFrac(getLagrangeFrac(p, points), sum)
	})

	return bigMath.integerFrac(sum)
}