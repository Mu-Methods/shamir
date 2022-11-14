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
    const points = getPoints(polynom, n + 1).slice(1);
    const shares = [];
    points.forEach(p => {
        const point = [0n, 0n];
        point[0] = p[0];
        point[1] = p[0] * p[1] + secret;
        shares.push(point);
    });
    return shares;
}
function randomShares(shares, n = 255) {
    return randomPoints(shares, n);
}
function recover(shares, t = shares.length) {
    return interpolate(shares.slice(0, t));
}
function recoverFull(shares, t = shares.length, polynom = []) {
    const recovered = interpolate(shares.slice(0, t));
    if (polynom.length < t) {
        polynom.push(recovered);
    }
    else {
        return polynom;
    }
    const copy = [];
    shares.forEach(share => copy.push(share));
    copy.pop();
    copy.forEach((share, i) => {
        const x = share[0];
        const y = (share[1] - recovered) / x;
        const newShare = [0n, 0n];
        newShare.push(x);
        newShare.push(y);
        copy[i] = newShare;
    });
    return recoverFull(copy, t - 1, polynom);
}