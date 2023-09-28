"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("./interpreter");
describe('test #Bool#', () => {
    it('should run Bool ast and returns false', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Bool',
            value: false,
        })).toEqual(false);
    });
    it('should run Bool ast and returns true', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Bool',
            value: true,
        })).toEqual(true);
    });
});
