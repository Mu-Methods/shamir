const { combinePoints } = require('./lagrange.js')

const points = [ [ 253, 198274094960 ], [ 92, 72733851334 ], [ 64, 50900765486 ] ]

const polynom = combinePoints(points)

console.log(points)
console.log(polynom)