const gcd = (p, q) => {
	if (p === q) {
		return p
	}

	return gcd(Math.min(p,q), Math.abs(p - q))
}

const lcm = (p, q) => {
	return p * q / gcd(p, q)
}

const scale = (array, num) => {
	return array.map(x => x*num)
}

const reduceMatrix = (matrix) => {
	for (let i = 0; i < matrix.length; i++) {
		for (let j = i + 1; i < matrix.length; j++) {
			const num = matrix[i][i] * matrix[j][i]
			matrix[j] = matrix[j].map(x => x - x*num)
		}
	}
	//for a square matrix M with dimensions n x n
	//starting at i = 0
	//for all j != i, if M[j][i] !== 0,
	//set M[j][i] -= lcm(M[i][i], M[j][i])
}

exports.gcd = gcd
exports.lcm = lcm