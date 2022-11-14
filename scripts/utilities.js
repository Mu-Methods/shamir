const crypto = require('crypto')

module.exports = {
	random,
	arrayOf
}

function random (num = 64) {
	return BigInt('0x' + crypto.randomBytes(num).toString('hex'))
}

function arrayOf(n, array = []) {
	if (array.length < n) {
		array.push(array.length)
		return arrayOf(n, array)
	}

	return array
}