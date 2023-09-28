"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("./interpreter");
describe('test #Str#', () => {
    it('should run Str ast and returns false', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Str',
            value: '',
        })).toEqual('');
    });
    it('should run Str ast and returns true', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Str',
            value: 'abc item',
        })).toEqual('abc item');
    });
});
