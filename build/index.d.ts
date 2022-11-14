declare const interpolate: any;
declare const makePolynomial: any, getPoints: any, randomPoints: any;
declare type tPoint = [bigint, bigint];
declare function share(secret: bigint, t: number, n?: number): Array<tPoint>;
declare function randomShares(shares: Array<tPoint>, n?: number): Array<tPoint>;
declare function recover(shares: Array<tPoint>, t?: number): bigint;
declare function recoverFull(shares: Array<tPoint>, t?: number, polynom?: Array<bigint>): Array<bigint>;
