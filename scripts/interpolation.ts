/**
 * points are arrays of two bigints
 * type point = [bigint, bigint]
*/

/**
 * given points
 * 
*/
module.exports = {
	interpolate
}

type tPoint = [bigint, bigint]

function denominators(points:Array<tPoint>):Array<bigint> {
	const dens:Array<bigint> = []
	points.forEach((p, i) => {
		let product:bigint = 1n
		points.forEach((q, j) => {
			if (j !== i) {
				product *= (p[0] - q[0])
			}
		})
		dens.push(product)
	})
	return dens
}

function numerators(points:Array<tPoint>):Array<bigint> {
	const nums:Array<bigint> = []
	points.forEach((p, i) => {
		let product:bigint = p[1]
		points.forEach((q, j) => {
			if (j !== i) {
				product *= -q[0]
			}
		})
		nums.push(product)
	})
	return nums
}


function interpolate(points:Array<tPoint>):bigint {
	const dens:Array<bigint> = denominators(points)
	const nums:Array<bigint> = numerators(points)

	let sum:bigint = 0n
	nums.forEach((num, i) => {
		let product:bigint = num
		dens.forEach((den, j) => {
			if (j !== i) {
				product *= den
			}
		})
		sum += product
	})
	dens.forEach(den => sum /= den)
	return sum
}