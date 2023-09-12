/* eslint-disable eqeqeq */
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
      if (expression.op == 'Eq') {
        return interpreter(expression.lhs, variables) === interpreter(expression.rhs, variables);
      }

      if (expression.op == 'Add') {
        return interpreter(expression.lhs, variables) + interpreter(expression.rhs, variables);
      }

      if (expression.op == 'Sub') {
        return interpreter(expression.lhs, variables) - interpreter(expression.rhs, variables);
      }

      if (expression.op == 'Or') {
        return interpreter(expression.lhs, variables) || interpreter(expression.rhs, variables);
      }

      if (expression.op == 'Lt') {
        return interpreter(expression.lhs, variables) < interpreter(expression.rhs, variables);
      }

      console.warn(expression);
      throw new Error('Ops, operação não mapeada');

    case 'If':
      if (interpreter(expression.condition, variables)) {
        return interpreter(expression.then, variables);
      }
      return interpreter(expression.otherwise, variables);

    case 'Function':
      return (...args) => {
        const localScope = { ...variables };
        expression.parameters.forEach((paramter, index) => {
          localScope[paramter.text] = args[index];
        });

        return interpreter(expression.value, localScope);
      };

    case 'Let':
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      variables[expression.name.text] = interpreter(expression.value, variables);

      return interpreter(expression.next, variables);

    case 'Int':
      return expression.value;

    case 'Var':
      return variables[expression.text];

    case 'Str':
      return expression.value;

    case 'Bool':
      return expression.value;

    case 'Call': {
      const argumentsLocal: any[] = [];

      for (let count = 0; count < expression.arguments.length; count += 1) {
        argumentsLocal[count] = interpreter(expression.arguments[count], variables);
      }

      return interpreter(expression.callee, variables)(...argumentsLocal);
    }
    default:
      console.error(expression);
      throw new Error('Erro não mapeado');
  }
};
