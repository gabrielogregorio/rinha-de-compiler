"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("./interpreter");
describe('test #Int#', () => {
    it('should returns error on try declare not integer', () => {
        function callInterpreter() {
            (0, interpreter_1.interpreter)({
                kind: 'Int',
                value: 1.2,
            });
        }
        expect(callInterpreter).toThrowError('number is not integer');
    });
    it('should run Int ast and returns 10', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Int',
            value: 10,
        })).toEqual(10);
    });
    it('should run Int ast and returns 20', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Int',
            value: 20,
        })).toEqual(20);
    });
    it('should run Int ast and returns 0', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Int',
            value: 0,
        })).toEqual(0);
    });
    it('should run Int ast and returns -20', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Int',
            value: -20,
        })).toEqual(-20);
    });
});
