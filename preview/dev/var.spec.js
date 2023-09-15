"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("./interpreter");
describe('test #Var#', () => {
    it('should try access undefined variable', () => {
        function callInterpreter() {
            (0, interpreter_1.interpreter)({
                kind: 'Var',
                text: 'nameVar',
            });
        }
        expect(callInterpreter).toThrowError('variable "nameVar" is not declared');
    });
    it('should run Var ast and returns false', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Let',
            name: { text: 'myVar' },
            value: {
                kind: 'Str',
                value: 'myValueVar',
            },
            next: {
                kind: 'Var',
                text: 'myVar',
            },
        })).toEqual('myValueVar');
    });
});
