import { ExpressionBase } from './types';
import { interpreter } from './interpreter';

const program: ExpressionBase = {
  expression: {
    kind: 'Let',
    name: {
      text: 'fib',
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
          op: 'Lt',
          rhs: {
            kind: 'Int',
            value: 2,
          },
        },
        then: {
          kind: 'Var',
          text: 'n',
        },
        otherwise: {
          kind: 'Binary',
          lhs: {
            kind: 'Call',
            callee: {
              kind: 'Var',
              text: 'fib',
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
          op: 'Add',
          rhs: {
            kind: 'Call',
            callee: {
              kind: 'Var',
              text: 'fib',
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
                  value: 2,
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
          text: 'fib',
        },
        arguments: [
          {
            kind: 'Int',
            value: 1000,
          },
        ],
      },
    },
  },
};

describe('InterpreterFib', () => {
  it('should run fib() ast and returns 55', () => {
    const EXPECTED_RESULT_FIB = 4.346655768693743e208;

    expect(interpreter(program.expression)).toEqual(EXPECTED_RESULT_FIB);
  });
});
