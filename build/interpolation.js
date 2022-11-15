"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpolate = void 0;
function denominators(points) {
    const dens = [];
    for (let i = 0; i < points.length; i++) {
        let product = 1n;
        for (let j = 0; j < points.length; j++) {
            if (j !== i) {
                product *= (points[i][0] - points[j][0]);
            }
        }
        dens.push(product);
    }
    return dens;
}
function numerators(points) {
    const nums = [];
    for (let i = 0; i < points.length; i++) {
        let product = points[i][1];
        for (let j = 0; j < points.length; j++) {
            if (j !== i) {
                product *= -points[j][0];
            }
        }
        nums.push(product);
    }
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
