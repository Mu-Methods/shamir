"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomPoints = exports.getPoints = exports.makePolynomial = void 0;
const crypto = require('crypto');
function plug(x, polynom) {
    let y = 0n;
    const copy = [];
    polynom.forEach(elem => copy.push(elem));
    while (copy.length > 0) {
        y *= x;
        let last = copy.pop();
        if (typeof last === 'bigint') {
            y += last;
        }
    }
    return y;
}
function makePolynomial(num) {
    const polynom = [];
    while (polynom.length <= num) {
        polynom.push(BigInt('0x' + crypto.randomBytes(32).toString('hex')));
    }
    return polynom;
}
exports.makePolynomial = makePolynomial;
function getPoints(polynom, n = 256) {
    const points = [];
    while (points.length < n) {
        const p = [0n, 0n];
        const x = BigInt(points.length);
        const y = plug(x, polynom);
        p[0] = x;
        p[1] = y;
        points.push(p);
    }
    return points;
}
exports.getPoints = getPoints;
function randomPoints(points, n) {
    const copy = [];
    points.forEach(p => copy.push(p));
    while (copy.length > n) {
        let num = Math.ceil(copy.length / 256);
        const rando = parseInt(crypto.randomBytes(num).toString('hex'));
        if (rando < copy.length) {
            copy.splice(rando, 1);
        }
    }
    return copy;
}
exports.randomPoints = randomPoints;
