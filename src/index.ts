/* eslint-disable no-use-before-define */

export const programSum = {
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

const variables = {};

export const handleGetVariable = (nameVar: string): string | number | boolean => variables[nameVar];

export const handleGetInteger = (value: number): boolean => value;

const handleLogicOperations = (expr) => {
  if (expr.op === 'Eq') {
    return interpreter(expr.lhs) === interpreter(expr.rhs);
  }

  if (expr.op === 'Add') {
    return interpreter(expr.lhs) + interpreter(expr.rhs);
  }

  if (expr.op === 'Sub') {
    return interpreter(expr.lhs) - interpreter(expr.rhs);
  }
};

const handleCondictions = (expr) => {
  if (interpreter(expr.condition)) {
    return interpreter(expr.then);
  }
  return interpreter(expr.otherwise);
};

const handleDeclarationFunctions =
  (expr) =>
  (...args) => {
    for (let counter = 0; counter < expr.parameters.length; counter++) {
      variables[expr.parameters[counter].text] = args[counter];
    }
    return interpreter(expr.value);
  };

const handleCallFuncions = (expr) => {
  const functionItem = interpreter(expr.callee);
  const argValues = expr.arguments.map(interpreter);
  return functionItem(...argValues);
};

const handleDeclarateVariable = (expr) => {
  variables[expr.name.text] = interpreter(expr.value);
  if (expr.next) {
    return interpreter(expr.next);
  }
};

const interpreter = (expr) => {
  if (expr.kind === 'Var') {
    return handleGetVariable(expr.text);
  }

  if (expr.kind === 'Int') {
    return handleGetInteger(expr.value);
  }

  if (expr.kind === 'Binary') {
    return handleLogicOperations(expr);
  }

  if (expr.kind === 'If') {
    return handleCondictions(expr);
  }

  if (expr.kind === 'Function') {
    return handleDeclarationFunctions(expr);
  }

  if (expr.kind === 'Call') {
    return handleCallFuncions(expr);
  }

  if (expr.kind === 'Print') {
    return console.log(interpreter(expr.value));
  }

  if (expr.kind === 'Let') {
    return handleDeclarateVariable(expr);
  }

  return new Error('Ops');
};

interpreter(programSum.expression);
