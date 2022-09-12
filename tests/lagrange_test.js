var test = require('tape')


const { combinePoints } = require('./lagrange.js')

const points = [ [ 253, 198274094960 ], [ 92, 72733851334 ], [ 64, 50900765486 ] ]
const polynom = combinePoints(points)

// console.log(points)
// console.log(polynom)


test('should return the correct array when combined', async (t) => {
   const expect = []
   t.plan(1)
   t.deepEqual(result, expect, `${result} should match ${expect}`)
})