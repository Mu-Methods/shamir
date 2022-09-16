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
  const thresh = 18
  const secret = random(32)
  const randomPolynomial = createRandomPolynomial(thresh)
  const testPolynom = addSecret(secret, randomPolynomial)
  t.equal(testPolynom[0], secret, 'secret and 0 index should be the same')
})


test('should correctly recover secret', async (t) => {
  const expect = []
  t.plan(2 * 255)
  for (let thresh = 1; thresh < 256; thresh++) {
    const secret = random(32)
    const randomPolynomial = createRandomPolynomial(thresh)
    const testPolynom = addSecret(secret, randomPolynomial)
    const testPoints = getPoints(testPolynom)
    const shares = randomPoints(thresh, testPoints)
    const recovered = combinePoints(shares)
    // todo write tests to ensure recovery is impossible without meeting the threshold
    // todo: loop test with all or some points
    t.deepEqual(testPolynom, recovered, 'should be the same')
  }
})

/*
test('should work with any pair of points', async(t) => {
  t.plan(255 * (255))
})
*/


