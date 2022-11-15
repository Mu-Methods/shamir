/**
 * points are arrays of two bigints
 * type point = [bigint, bigint]
*/

/**
 * given points
 * 
*/

type tPoint = [bigint, bigint]

function denominators(points:Array<tPoint>):Array<bigint> {
	const dens:Array<bigint> = []
	for (let i = 0; i < points.length; i++) {
		let product:bigint = 1n
		for (let j = 0; j < points.length; j++) {
			if (j !== i) {
				product *= (points[i][0] - points[j][0])
			}
		}
		dens.push(product)
	}
	return dens
}

function numerators(points:Array<tPoint>):Array<bigint> {
	const nums:Array<bigint> = []
	for (let i = 0; i < points.length; i++) {
		let product:bigint = points[i][1]
		for (let j = 0; j < points.length; j++) {
			if (j !== i) {
				product *= -points[j][0]
			}
		}
		nums.push(product)
	}
	return nums
}


export function interpolate(points:Array<tPoint>):bigint {
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