"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("./interpreter");
describe('InterpreterPrint test #Print#', () => {
    it('should run print() ast and returns "Hello world" without" test #PrintString#', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Print',
            value: {
                kind: 'Str',
                value: 'Hello world',
            },
        })).toEqual('Hello world');
    });
    it('should run print() ast and returns "10" without" test #PrintNumber#', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Print',
            value: {
                kind: 'Int',
                value: 10,
            },
        })).toEqual(10);
    });
    it('should run print() ast and returns "true" without" test #PrintBoolean#', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Print',
            value: {
                kind: 'Bool',
                value: true,
            },
        })).toEqual(true);
    });
    it('should run print() ast and returns "<#closure>" without" test #PrintClosure#', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Print',
            value: {
                kind: 'Function',
                parameters: [
                    {
                        text: 'n',
                    },
                ],
                value: {
                    kind: 'Bool',
                    value: true,
                },
            },
        })).toEqual('<#closure>');
    });
    it('should run print() ast and returns "Tuple" without" test #PrintTuple#', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Print',
            value: {
                kind: 'Tuple',
                first: {
                    kind: 'Int',
                    value: 10,
                },
                second: {
                    kind: 'Int',
                    value: 20,
                },
            },
        })).toEqual('(term, term)');
    });
});
