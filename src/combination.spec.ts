import { ExpressionBase } from './types';
import { interpreter } from './interpreter';

const programa: ExpressionBase = {
  expression: {
    kind: 'Let',
    name: {
      text: 'combination',
    },
    value: {
      kind: 'Function',
      parameters: [
        {
          text: 'n',
        },
        {
          text: 'k',
        },
      ],
      value: {
        kind: 'Let',
        name: {
          text: 'a',
        },
        value: {
          kind: 'Binary',
          lhs: {
            kind: 'Var',
            text: 'k',
          },
          op: 'Eq',
          rhs: {
            kind: 'Int',
            value: 0,
          },
        },
        next: {
          kind: 'Let',
          name: {
            text: 'b',
          },
          value: {
            kind: 'Binary',
            lhs: {
              kind: 'Var',
              text: 'k',
            },
            op: 'Eq',
            rhs: {
              kind: 'Var',
              text: 'n',
            },
          },
          next: {
            kind: 'If',
            condition: {
              kind: 'Binary',
              lhs: {
                kind: 'Var',
                text: 'a',
              },
              op: 'Or',
              rhs: {
                kind: 'Var',
                text: 'b',
              },
            },
            then: {
              kind: 'Int',
              value: 1,
            },
            otherwise: {
              kind: 'Binary',
              lhs: {
                kind: 'Call',
                callee: {
                  kind: 'Var',
                  text: 'combination',
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
                  {
                    kind: 'Binary',
                    lhs: {
                      kind: 'Var',
                      text: 'k',
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
                  text: 'combination',
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
                  {
                    kind: 'Var',
                    text: 'k',
                  },
                ],
              },
            },
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
          text: 'combination',
        },
        arguments: [
          {
            kind: 'Int',
            value: 10,
          },
          {
            kind: 'Int',
            value: 2,
          },
        ],
      },
    },
  },
};

describe('', () => {
  it('', () => {
    expect(interpreter(programa.expression)).toEqual(45);
  });
});
