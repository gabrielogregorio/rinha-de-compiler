/* eslint-disable no-use-before-define */

const handleGetVariable = (variables: any, nameVar: string): string | number | boolean => variables[nameVar];

const handleGetInteger = (value: number): number => value;

const handleLogicOperations = (variables: any, expr: any) => {
  if (expr.op === 'Eq') {
    return interpreter(variables, expr.lhs) === interpreter(variables, expr.rhs);
  }

  if (expr.op === 'Add') {
    return interpreter(variables, expr.lhs) + interpreter(variables, expr.rhs);
  }

  if (expr.op === 'Sub') {
    return interpreter(variables, expr.lhs) - interpreter(variables, expr.rhs);
  }

  if (expr.op === 'Or') {
    return interpreter(variables, expr.lhs) || interpreter(variables, expr.rhs);
  }

  if (expr.op === 'Lt') {
    return interpreter(variables, expr.lhs) < interpreter(variables, expr.rhs);
  }

  if (expr.op === 'Rt') {
    return interpreter(variables, expr.lhs) > interpreter(variables, expr.rhs);
  }

  throw new Error('Invalid Logic');
};

const handleConditions = (variables: any, expr: any) => {
  // eslint-disable-next-line no-use-before-define
  if (interpreter(variables, expr.condition)) {
    return interpreter(variables, expr.then);
  }
  return interpreter(variables, expr.otherwise);
};

// eslint-disable-next-line consistent-return
export const interpreter = (variables: any, expr: any) => {
  if (expr.kind === 'Var') {
    return handleGetVariable(variables, expr.text);
  }

  if (expr.kind === 'Int') {
    return handleGetInteger(expr.value);
  }

  if (expr.kind === 'Binary') {
    return handleLogicOperations(variables, expr);
  }

  if (expr.kind === 'If') {
    return handleConditions(variables, expr);
  }

  if (expr.kind === 'Function') {
    return (...args) => {
      const localVariables = { ...variables };
      for (let counter = 0; counter < expr.parameters.length; counter += 1) {
        localVariables[expr.parameters[counter].text] = args[counter];
      }
      return interpreter(localVariables, expr.value);
    };
  }

  if (expr.kind === 'Call') {
    const fn = interpreter(variables, expr.callee) as Function;
    const argValues = expr.arguments.map((arg) => interpreter(variables, arg));
    return fn(...argValues);
  }

  if (expr.kind === 'Print') {
    const result = interpreter(variables, expr.value);
    console.log(result);
    return result;
  }

  if (expr.kind === 'Let') {
    // eslint-disable-next-line no-param-reassign
    variables[expr.name.text] = interpreter(variables, expr.value);
    if (expr.next) {
      return interpreter(variables, expr.next);
    }
  }
};
