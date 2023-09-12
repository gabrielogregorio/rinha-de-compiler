import { Expression } from './types';

// eslint-disable-next-line sonarjs/cognitive-complexity
export const interpreter = (expression: Expression, variables = {}) => {
  switch (expression.kind) {
    case 'Print': {
      const value = interpreter(expression.value, variables);
      console.log(value);
      return value;
    }

    case 'Binary':
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

      throw new Error(`unmapped operation ${expression}`);

    case 'If':
      return interpreter(
        interpreter(expression.condition, variables) ? expression.then : expression.otherwise,
        variables,
      );

    case 'Function':
      return (...args) => {
        const localScope = { ...variables };

        for (let count = 0; count < expression.parameters.length; count += 1) {
          localScope[expression.parameters[count].text] = args[count];
        }

        return interpreter(expression.value, localScope);
      };

    case 'Let':
      // eslint-disable-next-line no-param-reassign
      variables[expression.name.text] = interpreter(expression.value, variables);

      return interpreter(expression.next, variables);

    case 'Int':
    case 'Str':
    case 'Bool':
      return expression.value;

    case 'Var':
      return variables[expression.text];

    case 'Call': {
      const args = new Array(expression.arguments.length);

      for (let count = 0; count < expression.arguments.length; count += 1) {
        args[count] = interpreter(expression.arguments[count], variables);
      }

      return interpreter(expression.callee, variables)(...args);
    }
    default:
      throw new Error(`unmapped instruction ${expression}`);
  }
};
