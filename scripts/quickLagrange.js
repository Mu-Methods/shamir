module.exports = { 
	recoverFrom
}

function getDivisors(points) {
	const divisors = []
	points.forEach((p, i) => {
		let d = 1n
		points.forEach((q, j) => {
			if (i !== j) {
				d *= p[0] - q[0]
			}
		})
		divisors.push(d)
	})
	return divisors
}

function getDividends(points, divisors) {
	const dividends = []
	points.forEach((p, i) => {
		let dend = p[1]
		points.forEach((q, j) => {
			if (i !== j) {
				dend *= (-q[0])
			}
		})
		divisors.forEach((d, k) => {
			if (i !== k) {
				dend *= d
			}
		})
		dividends.push(dend)
	})
	return dividends
}

function recoverFrom(points) {
	const divisors = getDivisors(points)
	const dividends = getDividends(points, divisors)
	let secret = 0n
	dividends.forEach((dend, i) => {
		secret += dend
	})
	divisors.forEach(elem => {
		secret /= elem
	})
	return secret
}