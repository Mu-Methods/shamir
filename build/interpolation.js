"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpolate = void 0;
function denominators(points) {
    const dens = [];
    points.forEach((p, i) => {
        let product = 1n;
        points.forEach((q, j) => {
            if (j !== i) {
                product *= (p[0] - q[0]);
            }
        });
        dens.push(product);
    });
    return dens;
}
function numerators(points) {
    const nums = [];
    points.forEach((p, i) => {
        let product = p[1];
        points.forEach((q, j) => {
            if (j !== i) {
                product *= -q[0];
            }
        });
        nums.push(product);
    });
    return nums;
}
function interpolate(points) {
    const dens = denominators(points);
    const nums = numerators(points);
    let sum = 0n;
    nums.forEach((num, i) => {
        let product = num;
        dens.forEach((den, j) => {
            if (j !== i) {
                product *= den;
            }
        });
        sum += product;
    });
    dens.forEach(den => sum /= den);
    return sum;
}
exports.interpolate = interpolate;
