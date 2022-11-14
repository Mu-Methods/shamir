const crypto = require('crypto')

type tPoint = [bigint, bigint]

function plug(x:bigint, polynom:Array<bigint>) {
	let y:bigint = 0n
	const copy:Array<bigint> = []
	polynom.forEach(elem => copy.push(elem))
	while (copy.length > 0) {
		y *= x
		let last:any = copy.pop()
		if (typeof last === 'bigint') {
			y += last
		}
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
	while (points.length <= n) {
		const p:tPoint = [0n, 0n]
		const x:bigint = BigInt(points.length)
		const y:bigint = plug(x, polynom)
		p[0] = x
		p[1] = y
		points.push(p)
	}
	return points
}

export function randomPoints(points:Array<tPoint>, n:number):Array<tPoint> {
	const copy:Array<tPoint> = []
	points.forEach(p => copy.push(p))
	while (copy.length > n) {
		let num:number = Math.ceil(copy.length / 256)
		const rando:number = parseInt(crypto.randomBytes(num).toString('hex'))
		if (rando < copy.length) {
			copy.splice(rando, 1)
		}
	}
	return copy
}