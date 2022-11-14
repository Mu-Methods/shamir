declare type tPoint = [bigint, bigint];
export declare function makePolynomial(num: number): Array<bigint>;
export declare function getPoints(polynom: Array<bigint>, n?: number): Array<tPoint>;
export declare function randomPoints(points: Array<tPoint>, n: number): Array<tPoint>;
export {};
