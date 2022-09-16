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
  for (let thresh = 1; thresh < 100; thresh++) {
    console.log(thresh)
    const secret = random(32)
    console.log(secret)
    const randomPolynomial = createRandomPolynomial(thresh)
    const testPolynom = addSecret(secret, randomPolynomial)
    //console.log(testPolynom)
    const testPoints = getPoints(testPolynom)
    //console.log(testPoints)
    const shares = randomPoints(thresh, testPoints)
    //console.log(shares)
    const recovered = combinePoints(shares)
    console.log(recovered[0])
    //console.log(recovered)
    // todo write tests to ensure recovery is in posible without meeting the threshold
    // todo: loop test with all or some points
    //t.equal(testPolynom[0], secret, 'secret and 0 index should be the same')
    t.deepEqual(testPolynom, recovered, 'should be the same')
  }
})



