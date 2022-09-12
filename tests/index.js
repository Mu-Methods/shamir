var test = require('tape')
const {
  random,
  addSecret,
  createRandomPolynomial,
  getPoints,
  randomPoints,
  combinePoints
} = require('../scripts/shamir')

test('#addSecret', async (t) => {
  t.plan(1)
  const thresh = 3
  const secret = Math.floor(random()*100000000)
  const randomPolynomial = createRandomPolynomial(thresh)
  const testPolynom = addSecret(secret, randomPolynomial)
  t.equal(testPolynom[0], secret, 'secret and 0 index should be the same')
})

test('should correctly recover secret', async (t) => {
  const expect = []
  t.plan(2)
  const thresh = 3
  const secret = Math.floor(random()*100000000)
  const randomPolynomial = createRandomPolynomial(thresh)
  const testPolynom = addSecret(secret, randomPolynomial)
  const testPoints = getPoints(testPolynom)
  const shares = randomPoints(thresh, testPoints)
  const recovered = combinePoints(shares)
  // todo write tests to ensure recovery is in posible without meeting the threshold
  // todo: loop test with all or some points
  t.equal(testPolynom[0], secret, 'secret and 0 index should be the same')
  t.deepEqual(testPolynom, recovered, 'should be the same')
})



