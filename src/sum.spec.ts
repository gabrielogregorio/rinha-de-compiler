import { ExpressionBase } from './types';
import { interpreter } from './interpreter';

const programa: ExpressionBase = {
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

describe('', () => {
  it('', () => {
    expect(interpreter(programa.expression)).toEqual(15);
  });
});
