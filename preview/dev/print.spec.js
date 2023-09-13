"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("./interpreter");
const program = {
    name: 'print.rinha.rinha',
    expression: {
        kind: 'Print',
        value: {
            kind: 'Str',
            value: 'Hello world',
            location: {
                start: 7,
                end: 20,
                filename: 'print.rinh2a',
            },
        },
        location: {
            start: 0,
            end: 21,
            filename: 'print.rinha',
        },
    },
    location: {
        start: 0,
        end: 21,
        filename: 'print.rinha',
    },
};
describe('InterpreterPrint', () => {
    it('should run print() ast and returns "Hello world"', () => {
        expect((0, interpreter_1.interpreter)(program.expression)).toEqual('Hello world');
    });
});
