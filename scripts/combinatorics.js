module.exports = {
	factorial,
	permute,
	combinate,
	arrayOf
}
//all subsets of an ordered set of unique elements of a certain size.

//permute(array, n) returns an array of arrays
//where each subarray is a unique permutation of the given array
function arrayOf(n, array = []) {
	if (array.length < n) {
		array.push(array.length)
		return arrayOf(n, array)
	}

	return array
}

function factorial(n) {
	if (n === 0n) {
		return 1n
	}

	return n * factorial(n - 1n)
}



//for each permute(A, n) = for each element a in A, permute(A, n - 1).unshift(a)
function permute(array, n = 1, i = 0,  perms = []) {
	if (n === 1) {
		array.forEach(elem => perms.push([elem]))
		return perms
	}

	array.forEach((elem) => {
		permute(array, n - 1).forEach(perm => {
			if (perm.indexOf(elem) === -1) {
				perms.push([elem].concat(perm))
			}
		})
	})

	return perms
}

function combinate(array, n = 0, combos = []) {
	if (n === 0) {
		return combos
	}

	if (n === 1) {
		array.forEach(elem => {
			combos.push([elem])
		})
		return combos
	}

	array.forEach((elem, index, arr) => {
		combinate(arr.slice(index + 1), n - 1).forEach(combo => {
			combos.push([elem].concat(combo))
		})
	})

	return combos
}