var test = require('tape')

const {
  factorial,
  permute,
  combinate,
  arrayOf
} = require('./combinatorics.js')

const {
  share,
  randomShares,
  recover,
  recoverFull
} = require('../build/index.js')

const {
  makePolynomial,
  getPoints,
  plug
} = require('../build/polynomials.js')

const crypto = require('crypto')

function randomSecret() {
  return BigInt('0x' + crypto.randomBytes(32).toString('hex'))
}

// runs slow when maxThresh is too high, but can go up to 255.
const maxThresh = 255


test('should correctly recover secret using recover()', async (t) => {
  t.plan(maxThresh - 1)
  const secret = randomSecret()
  for (let thresh = 2; thresh <= maxThresh; thresh++) {
    const shares = share(secret, thresh)
    const recovered = recover(shares, thresh)
    // todo write tests to ensure recovery is impossible without meeting the threshold
    // todo: loop test with all or some points
    t.equal(secret, recovered, `secret recovered from first ${thresh} shares`)
  }
})


test('should correctly recover polynomial using recoverFull()', async (t) => {
  t.plan(100 - 1)
  for (let thresh = 2; thresh <= 100; thresh++) {
    const polynom = makePolynomial(thresh - 1)
    const shares = getPoints(polynom).slice(1)
    const spoil = recover(shares, thresh)
    const recovered = recoverFull(shares, thresh)
    t.deepEqual(polynom, recovered, 'polynom correctly recovered')
  }
})


const maxCombo = 255

test('should work with any pair of points', async(t) => {
  const secret = randomSecret()
  const thresh = 2
  const shares = share(secret, thresh)
  const combinations = combinate(arrayOf(maxCombo), thresh)
  t.plan(combinations.length)
  combinations.forEach(combo => {
    let shareIndex = ''
    const points = []
    combo.forEach(elem => {
      shareIndex += `${elem}, `
      points.push(shares[elem])
    })
    const recovered = recover(points, thresh)
    t.equal(secret, recovered, `secret recovered from shares ${shareIndex}`)    
  })
})



test('should work with any 3 points', async(t) => {
  const secret = randomSecret()
  const thresh = 3
  const shares = share(secret, thresh)
  const combinations = combinate(arrayOf(maxCombo), thresh)
  t.plan(combinations.length)
  combinations.forEach(combo => {
    const points = []
    let shareIndex = ``
    combo.forEach(elem => {
      shareIndex += `${elem}, `
      points.push(shares[elem])
    })
    const recovered = recover(points, thresh)
    t.equal(secret, recovered, `secret recovered from shares ${shareIndex}`)    
  })
})


test('can\'t recover secret without enough shares', async (t) => {
  t.plan(maxThresh - 2)
  const secret = randomSecret()
  const shares = share(secret, maxThresh)
  for (let thresh = 2; thresh <= maxThresh - 1; thresh++) {
    const recovered = recover(shares.slice(0, thresh))
    if (recovered === secret) {
      throw new Error('something went wrong')
    }
    t.equal(false, recovered === secret, 'not enough shares, secret not recovered')
  }
})
