"use strict";
const { interpolate } = require('./interpolation.js');
const { makePolynomial, getPoints, randomPoints } = require('./polynomials.js');
module.exports = {
    share,
    randomShares,
    recover,
    recoverFull
};
function share(secret, t, n = 255) {
    if (t < 2 || t > n || n > 255) {
        throw new Error("threshold too small");
    }
    const polynom = makePolynomial(t - 2);
    const shares = getPoints(polynom, n + 1).slice(1);
    shares.forEach(p => {
        p[1] *= p[0];
        p[1] += secret;
    });
    return shares;
}
function randomShares(shares, n = 255) {
    return randomPoints(shares, n);
}
function recover(shares, t = shares.length) {
    return interpolate(shares.slice(0, t));
}
function recoverFull(shares, thresh = shares.length, polynom = []) {
    if (polynom.length === thresh) {
        return polynom;
    }
    const recovered = recover(shares.slice(0, thresh - polynom.length));
    polynom.push(recovered);
    const copy = shares.slice(0, thresh - polynom.length);
    copy.forEach(s => {
        s[1] -= recovered;
        s[1] /= s[0];
    });
    return recoverFull(copy, thresh, polynom);
}
