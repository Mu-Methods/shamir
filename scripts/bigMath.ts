type tFrac = [bigint, bigint]

export function abs(x:bigint):bigint {
		if (x < 0) {
			return -x
		} else {
			return x
		}
	}

export function min(x:bigint, y:bigint):bigint {
	if (x < y) {
		return x
	} else {
		return y
	}
}

export function max(x:bigint, y:bigint) {
	if (x >= y) {
		return x
	} else {
		return y
	}
}

export function gcd(x:bigint, y:bigint):bigint {
	let mini = min(abs(x), abs(y))
	let maxi = max(abs(x),abs(y))

	if (mini * maxi === 0n) {
		return 0n
	}

	if (maxi % mini === 0n) {
		return mini
	}

	return gcd(mini, maxi % mini)
}

 /**
 *type frac = [bigint, bigint]
 * such that frac[0] !== 0n
 * represented in decimal as Number(p[1]) / Number(p[0])
 * */
export function newFrac(denom:bigint, numer:bigint):tFrac {
	const frac:tFrac = [abs(denom), numer * denom / abs(denom)]
	if (denom !== 0n) {	
		return frac
	} else {
		throw new Error('not a valid fraction')
	}
}

export function reduceFrac(frac:tFrac):tFrac {
	const factor = gcd(frac[0], frac[1])
	if (factor === 0n) {
		return frac
	}
	return newFrac(frac[0] / factor, frac[1] / factor)
}

export function addFrac(f1:tFrac, f2:tFrac):tFrac {
	return reduceFrac(newFrac(f1[0] * f2[0], f1[0] * f2[1] + f1[1] * f2[0]))
}

export function multiplyFrac(f1:tFrac, f2:tFrac):tFrac {
	return reduceFrac(newFrac(f1[0] * f2[0], f1[1] * f2[1]))
}

export function integerFrac(frac:tFrac):bigint {
	const copy = reduceFrac(frac)
	return copy[1] / copy[0]
}