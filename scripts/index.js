/**
 * given secret x, threshold t, and number of shares n
 * generate a random polynomial of degree t-1: array of coeefficients
 * generate t-2 random coefficients, secret is the last coefficient
 * get points from the polynomial
 * (encrypt the points)
 * combine the points to recover the secret
*/
var interpolate = require('./interpolation.js').interpolate;
var _a = require('./polynomials.js'), makePolynomial = _a.makePolynomial, getPoints = _a.getPoints, randomPoints = _a.randomPoints;
module.exports = {
    share: share,
    randomShares: randomShares,
    recover: recover,
    recoverFull: recoverFull
};
function share(secret, t, n) {
    if (n === void 0) { n = 255; }
    if (t < 2 || t > n || n > 255) {
        throw new Error("threshold too small");
    }
    var polynom = makePolynomial(t - 2);
    var points = getPoints(polynom, n).slice(1);
    var shares = [];
    points.forEach(function (p) {
        var point = [0n, 0n];
        point[0] = p[0];
        point[1] = p[0] * p[1] + secret;
        shares.push(point);
    });
    return shares;
}
function randomShares(shares, n) {
    if (n === void 0) { n = 255; }
    return randomPoints(shares, n);
}
function recover(shares, t) {
    if (t === void 0) { t = shares.length; }
    return interpolate(shares.slice(0, t));
}
function recoverFull(shares, t, polynom) {
    if (t === void 0) { t = shares.length; }
    if (polynom === void 0) { polynom = []; }
    var recovered = interpolate(shares.slice(0, t));
    if (polynom.length < t) {
        polynom.push(recovered);
    }
    else {
        return polynom;
    }
    var copy = [];
    shares.forEach(function (share) { return copy.push(share); });
    copy.pop();
    copy.forEach(function (share) {
        var x = share[0];
        var y = (share[1] - recovered) / x;
    });
    return recoverFull(copy, t - 1, polynom);
}
