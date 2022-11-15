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
  getPoints
} = require('../build/polynomials.js')

const crypto = require('crypto')

function randomSecret() {
  return BigInt('0x' + crypto.randomBytes(32).toString('hex'))
}


const maxThresh = 100

test('should correctly recover secret using recover()', async (t) => {
  t.plan(maxThresh -2)
  const secret = randomSecret()
  for (let thresh = 2; thresh < maxThresh; thresh++) {
    const shares = share(secret, thresh)
    const recovered = recover(shares, thresh)
    // todo write tests to ensure recovery is impossible without meeting the threshold
    // todo: loop test with all or some points
    t.equal(secret, recovered, `secret recovered from first ${thresh} shares`)
  }
})

test('should correctly recover polynomial using recoverFull()', async (t) => {
  const maxThresh = 100
  t.plan(maxThresh - 2)
  const secret = randomSecret()
  for (let thresh = 2; thresh < maxThresh; thresh++) {
    const polynom = makePolynomial(thresh - 2)
    polynom.unshift(secret)
    const shares = getPoints(polynom, thresh + 1).slice(1);
    const recovered = recoverFull(shares)
    t.deepEqual(polynom, recovered, 'polynom correctly recovered')
  }
})


/*
test('should work with any pair of points', async(t) => {
  const secret = randomSecret()
  const thresh = 2
  const shares = share(secret, thresh)
  const combinations = combinate(arrayOf(255), thresh)
  t.plan(combinations.length)
  combinations.forEach(combo => {
    let shareIndex = ''
    const points = []
    combo.forEach(elem => {
      shareIndex += `${elem}, `
      points.push(shares[elem])
    })
    const recovered = recover(points)
    t.equal(secret, recovered, `secret recovered from shares ${shareIndex}`)    
  })
})



test('should work with any 3 points', async(t) => {
  const secret = randomSecret()
  const thresh = 3
  const shares = share(secret, thresh)
  const combinations = combinate(arrayOf(255), thresh)
  t.plan(combinations.length)
  combinations.forEach(combo => {
    const points = []
    let shareIndex = ``
    combo.forEach(elem => {
      shareIndex += `${elem}, `
      points.push(shares[elem])
    })
    const recovered = recover(points)
    t.equal(secret, recovered, `secret recovered from shares ${shareIndex}`)    
  })
})

test('can\'t recover secret without enough shares', async (t) => {
  t.plan(maxThresh - 3)
  const secret = randomSecret()
  for (let thresh = 3; thresh < maxThresh; thresh++) {
    const shares = randomShares(share(secret, thresh, 255), thresh - 1)
    const recovered = recover(shares)
    t.equal(true, recovered !== secret, 'not enough shares, secret not recovered')
  }
})


*/
