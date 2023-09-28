"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("./interpreter");
const program = {
    expression: {
        kind: 'Let',
        name: {
            text: 'sum',
        },
        value: {
            kind: 'Function',
            parameters: [
                {
                    text: 'n',
                },
            ],
            value: {
                kind: 'If',
                condition: {
                    kind: 'Binary',
                    lhs: {
                        kind: 'Var',
                        text: 'n',
                    },
                    op: 'Eq',
                    rhs: {
                        kind: 'Int',
                        value: 1,
                    },
                },
                then: {
                    kind: 'Var',
                    text: 'n',
                },
                otherwise: {
                    kind: 'Binary',
                    lhs: {
                        kind: 'Var',
                        text: 'n',
                    },
                    op: 'Add',
                    rhs: {
                        kind: 'Call',
                        callee: {
                            kind: 'Var',
                            text: 'sum',
                        },
                        arguments: [
                            {
                                kind: 'Binary',
                                lhs: {
                                    kind: 'Var',
                                    text: 'n',
                                },
                                op: 'Sub',
                                rhs: {
                                    kind: 'Int',
                                    value: 1,
                                },
                            },
                        ],
                    },
                },
            },
        },
        next: {
            kind: 'Print',
            value: {
                kind: 'Call',
                callee: {
                    kind: 'Var',
                    text: 'sum',
                },
                arguments: [
                    {
                        kind: 'Int',
                        value: 5,
                    },
                ],
            },
        },
    },
};
describe('InterpreterSum', () => {
    it('should run sum() ast and returns 15', () => {
        const EXPECTED_RESULT_SUM = 15;
        expect((0, interpreter_1.interpreter)(program.expression)).toEqual(EXPECTED_RESULT_SUM);
    });
});
