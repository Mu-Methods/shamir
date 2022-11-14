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

const crypto = require('crypto')

function randomSecret() {
  return BigInt('0x' + crypto.randomBytes(32).toString('hex'))
}

/*
test('#addSecret', async (t) => {
  t.plan(1)
  const thresh = 18
  const secret = random(32)
  const randomPolynomial = createRandomPolynomial(thresh)
  const testPolynom = addSecret(secret, randomPolynomial)
  t.equal(testPolynom[0], secret, 'secret and 0 index should be the same')
})
*/


test('should correctly recover secret', async (t) => {
  const expect = []
  t.plan(254)
  const secret = randomSecret()
  for (let thresh = 2; thresh < 256; thresh++) {
    const shares = share(secret, thresh)
    const recovered = recover(shares, thresh)
    // todo write tests to ensure recovery is impossible without meeting the threshold
    // todo: loop test with all or some points
    t.equal(secret, recovered, `secret recovered from first ${thresh} shares`)
  }
})

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



