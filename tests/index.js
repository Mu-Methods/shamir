var test = require('tape')
const {
  random,
  arrayOf,
  addSecret,
  createRandomPolynomial,
  getPoints,
  randomPoints,
  combinePoints,
  createShares,
  recoverFrom
} = require('../scripts/shamir.js')

const { combinate } = require('../scripts/combinatorics.js')


test('#addSecret', async (t) => {
  t.plan(1)
  const thresh = 18
  const secret = random()
  const randomPolynomial = createRandomPolynomial(thresh)
  const testPolynom = addSecret(secret, randomPolynomial)
  t.equal(testPolynom[0], secret, 'secret and 0 index should be the same')
})

test('should correctly recover polynomial using combinePoints', async (t) => {
  t.plan(255)
  const secret = random()
  for (let thresh = 1; thresh < 256; thresh++) {
    const randomPolynomial = createRandomPolynomial(thresh - 1)
    const testPolynom = addSecret(secret, randomPolynomial)
    const testPoints = getPoints(testPolynom)
    const shares = randomPoints(thresh, testPoints)
    const recovered = combinePoints(shares)
    t.deepEqual(testPolynom, recovered, 'polynomials should be the same')
  }
})

test('should correctly recover secret using recoverFrom', async (t) => {
  t.plan(255)
  const secret = random()
  for (let thresh = 1; thresh < 256; thresh++) {
    const randomPolynomial = createRandomPolynomial(thresh - 1)
    const testPolynom = addSecret(secret, randomPolynomial)
    const testPoints = getPoints(testPolynom)
    const shares = randomPoints(thresh, testPoints)
    const recovered = recoverFrom(shares)
    // todo write tests to ensure recovery is impossible without meeting the threshold
    // todo: loop test with all or some points
    t.deepEqual(secret, recovered, 'secret should be the same')
  }
})


test('should work with any pair of points', async(t) => {
  t.plan(32131)
  const secret = random()
  const thresh = 2
  const shares = createShares(secret, thresh)
  const combinations = combinate(arrayOf(254), thresh)
  combinations.forEach(combo => {
    const points = []
    combo.forEach(elem => {
      points.push(shares[elem])
    })
    const recovered = recoverFrom(points)
    t.equal(secret, recovered, 'secrets should be the same')    
  })
})

test('should work with any 3 points', async(t) => {
  t.plan(2699004)
  const secret = random()
  const thresh = 3
  const shares = createShares(secret, thresh)

  const combinations = combinate(arrayOf(254), thresh)
  combinations.forEach(combo => {
    const points = []
    combo.forEach(elem => {
      points.push(shares[elem])
    })
    const recovered = recoverFrom(points)
    t.equal(secret, recovered, 'secrets should be the same')    
  })
})

test('can\'t recover secret without enough points', async (t) => {
  t.plan(254)
  const secret = random()
  for (let thresh = 2; thresh < 256; thresh++) {
    const randomPolynomial = createRandomPolynomial(thresh - 1)
    const testPolynom = addSecret(secret, randomPolynomial)
    const testPoints = getPoints(testPolynom)
    testPoints.shift()
    const shares = randomPoints(thresh - 1, testPoints)
    const recovered = recoverFrom(shares)
    t.equal(true, recovered !== secret, 'secrets should be different')
  }
})

