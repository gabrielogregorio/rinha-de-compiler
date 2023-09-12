/* eslint-disable no-use-before-define */

const handleGetVariable = (variables: any, nameVar: string): string | number | boolean => variables[nameVar];

const handleGetInteger = (value: number): number => value;

const handleLogicOperations = (variables: any, expr: any) => {
  if (expr.op === 'Eq') {
    return interpret(variables, expr.lhs) === interpret(variables, expr.rhs);
  }

  if (expr.op === 'Add') {
    return interpret(variables, expr.lhs) + interpret(variables, expr.rhs);
  }

  if (expr.op === 'Sub') {
    return interpret(variables, expr.lhs) - interpret(variables, expr.rhs);
  }

  throw new Error('Invalid Logic');
};

const handleCondictions = (variables: any, expr: any) => {
  // eslint-disable-next-line no-use-before-define
  if (interpret(variables, expr.condition)) {
    return interpret(variables, expr.then);
  }
  return interpret(variables, expr.otherwise);
};

// eslint-disable-next-line consistent-return
export const interpret = (variables: any, expr: any) => {
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
    return handleCondictions(variables, expr);
  }

  if (expr.kind === 'Function') {
    return (...args) => {
      const localVariables = { ...variables };
      for (let counter = 0; counter < expr.parameters.length; counter += 1) {
        localVariables[expr.parameters[counter].text] = args[counter];
      }
      return interpret(localVariables, expr.value);
    };
  }

  if (expr.kind === 'Call') {
    const fn = interpret(variables, expr.callee) as Function;
    const argValues = expr.arguments.map((arg) => interpret(variables, arg));
    return fn(...argValues);
  }

  if (expr.kind === 'Print') {
    const result = interpret(variables, expr.value);
    console.log(result);
    return result;
  }

  if (expr.kind === 'Let') {
    // eslint-disable-next-line no-param-reassign
    variables[expr.name.text] = interpret(variables, expr.value);
    if (expr.next) {
      return interpret(variables, expr.next);
    }
  }
};
