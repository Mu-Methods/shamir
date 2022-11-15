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
	while (points.length < n) {
		const x:bigint = BigInt(points.length)
		const y:bigint = plug(x, polynom)
		const newPoint:tPoint = [x, y]
		points.push(newPoint)
	}
	return points
}

export function randomPoints(points:Array<tPoint>, n:number):Array<tPoint> {
	const copy:Array<tPoint> = points.slice(0)
	while (copy.length > n) {
		let num:number = Math.ceil(copy.length / 256)
		const rando:number = parseInt(crypto.randomBytes(num).toString('hex'))
		if (rando < copy.length) {
			copy.splice(rando, 1)
		}
	}
	return copy
}