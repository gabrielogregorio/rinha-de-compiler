"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("./interpreter");
const program = {
    name: 'ata.rinha',
    expression: {
        kind: 'Let',
        name: { text: 'm', location: { start: 4, end: 5, filename: 'ata.rinha' } },
        value: { kind: 'Int', value: 10, location: { start: 8, end: 10, filename: 'ata.rinha' } },
        next: {
            kind: 'Let',
            name: { text: 'test', location: { start: 16, end: 20, filename: 'ata.rinha' } },
            value: {
                kind: 'Function',
                parameters: [{ text: 'n', location: { start: 27, end: 28, filename: 'ata.rinha' } }],
                value: {
                    kind: 'Binary',
                    lhs: { kind: 'Var', text: 'n', location: { start: 39, end: 40, filename: 'ata.rinha' } },
                    op: 'Add',
                    rhs: { kind: 'Var', text: 'm', location: { start: 43, end: 44, filename: 'ata.rinha' } },
                    location: { start: 39, end: 44, filename: 'ata.rinha' },
                },
                location: { start: 23, end: 46, filename: 'ata.rinha' },
            },
            next: {
                kind: 'Print',
                value: {
                    kind: 'Call',
                    callee: { kind: 'Var', text: 'test', location: { start: 54, end: 58, filename: 'ata.rinha' } },
                    arguments: [{ kind: 'Int', value: 2, location: { start: 59, end: 60, filename: 'ata.rinha' } }],
                    location: { start: 54, end: 61, filename: 'ata.rinha' },
                },
                location: { start: 48, end: 62, filename: 'ata.rinha' },
            },
            location: { start: 12, end: 62, filename: 'ata.rinha' },
        },
        location: { start: 0, end: 62, filename: 'ata.rinha' },
    },
    location: { start: 0, end: 62, filename: 'ata.rinha' },
};
describe('InterpreterFib', () => {
    it('should run clousure() ast and returns 12', () => {
        const EXPECTED_RESULT_FIB = 12;
        expect((0, interpreter_1.interpreter)(program.expression)).toEqual(EXPECTED_RESULT_FIB);
    });
});
