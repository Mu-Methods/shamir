const crypto = require('crypto')

type tPoint = [bigint, bigint]

export function plug(x:bigint, polynom:Array<bigint>):bigint {
	let y:bigint = 0n
	for (let i = polynom.length - 1; i >= 0; i--) {
		y *= x
		y += polynom[i]
	}
	return y
}

export function makePolynomial(num: number):Array<bigint> {
	const polynom:Array<bigint> = []
	while (polynom.length <= num) {
		polynom.push(BigInt('0x' + crypto.randomBytes(32).toString('hex')))
	}
	return polynom
}

export function getPoints(polynom:Array<bigint>, n:number = 256):Array<tPoint> {
	const points:Array<tPoint> = []
	for (let i = 0; i < n; i++) {
		const x:bigint = BigInt(i)
		const y:bigint = plug(x, polynom)
		const newPoint:tPoint = [x, y]
		points.push(newPoint)
	}
	return points
}

export function randomPoints(points:Array<tPoint>, n:number):Array<tPoint> {
	const newPoints:Array<tPoint> = []
	while (newPoints.length < n) {
		const rando:number = (parseInt(crypto.randomBytes(2).toString('hex')) % points.length)
		if (rando < points.length) {
			let check = true
			newPoints.forEach(p => {
				if (points[rando][0] === p[0]) {
					check = false
				}
			})
			if (check) {
				newPoints.push(points[rando])
			}
		}
	}
	return newPoints
}