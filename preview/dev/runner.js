"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInterpreter = void 0;
const readAst_1 = require("./readAst");
const interpreter_1 = require("./interpreter");
const runInterpreter = (path) => {
    try {
        const astTree = (0, readAst_1.readAst)(path);
        (0, interpreter_1.interpreter)(astTree.expression, {});
    }
    catch (error) {
        console.error('Oops, an error occurred', error);
    }
};
exports.runInterpreter = runInterpreter;
const startTime = process.hrtime();
const listArgsPosition = 2;
const fileInterpreter = process.argv.slice(listArgsPosition)[0];
(0, exports.runInterpreter)(fileInterpreter);
const NANOSECONDS_IN_A_SECOND = 1e9;
const endTime = process.hrtime(startTime);
const totalSeconds = endTime[0] + endTime[1] / NANOSECONDS_IN_A_SECOND;
console.log(`\nExecution in ${totalSeconds}s `);
