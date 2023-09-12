import { Expression } from './types';

// eslint-disable-next-line sonarjs/cognitive-complexity
export const interpreter = (expression: Expression, variables = {}) => {
  if (expression.kind === 'Print') {
    const value = interpreter(expression.value, variables);
    console.log(value);
    return value;
  }

  if (expression.kind === 'Binary') {
    if (expression.op === 'Eq') {
      return interpreter(expression.lhs, variables) === interpreter(expression.rhs, variables);
    }

    if (expression.op === 'Add') {
      return interpreter(expression.lhs, variables) + interpreter(expression.rhs, variables);
    }

    if (expression.op === 'Sub') {
      return interpreter(expression.lhs, variables) - interpreter(expression.rhs, variables);
    }

    if (expression.op === 'Or') {
      return interpreter(expression.lhs, variables) || interpreter(expression.rhs, variables);
    }

    if (expression.op === 'Lt') {
      return interpreter(expression.lhs, variables) < interpreter(expression.rhs, variables);
    }

    console.warn(expression);
    throw new Error('Ops, operação não mapeada');
  }

  if (expression.kind === 'If') {
    if (interpreter(expression.condition, variables)) {
      return interpreter(expression.then, variables);
    }
    return interpreter(expression.otherwise, variables);
  }

  if (expression.kind === 'Function') {
    return (...args) => {
      const localScope = { ...variables };
      expression.parameters.forEach((paramter, index) => {
        localScope[paramter.text] = args[index];
      });

      return interpreter(expression.value, localScope);
    };
  }

  if (expression.kind === 'Let') {
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    variables[expression.name.text] = interpreter(expression.value, variables);

    return interpreter(expression.next, variables);
  }

  if (expression.kind === 'Int') {
    return expression.value;
  }

  if (expression.kind === 'Var') {
    return variables[expression.text];
  }

  if (expression.kind === 'Str') {
    return expression.value;
  }

  if (expression.kind === 'Bool') {
    return expression.value;
  }

  if (expression.kind === 'Call') {
    const argumentsLocal = [];

    for (let count = 0; count < expression.arguments.length; count += 1) {
      argumentsLocal[count] = interpreter(expression.arguments[count], variables);
    }

    return interpreter(expression.callee, variables)(...argumentsLocal);
  }

  console.error(expression);
  throw new Error('Erro não mapeado');
};
