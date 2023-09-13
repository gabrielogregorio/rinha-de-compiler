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
      // eslint-disable-next-line sonarjs/no-nested-switch
      switch (expression.op) {
        case 'Eq':
          return interpreter(expression.lhs, variables) === interpreter(expression.rhs, variables);

        case 'Add':
          return interpreter(expression.lhs, variables) + interpreter(expression.rhs, variables);

        case 'Sub':
          return interpreter(expression.lhs, variables) - interpreter(expression.rhs, variables);

        case 'Or':
          return interpreter(expression.lhs, variables) || interpreter(expression.rhs, variables);

        case 'Lt':
          return interpreter(expression.lhs, variables) < interpreter(expression.rhs, variables);

        default:
          throw new Error(`unmapped operation ${expression}`);
      }

    case 'If':
      return interpreter(
        interpreter(expression.condition, variables) ? expression.then : expression.otherwise,
        variables,
      );

    case 'Function':
      return (...args) => {
        const localScope = { ...variables };
        const { parameters } = expression;

        let count = 0;
        while (count < parameters.length) {
          localScope[parameters[count].text] = args[count];
          count += 1;
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
      const args = [];
      const size = expression.arguments.length;

      let count = 0;
      while (count < size) {
        args[count] = interpreter(expression.arguments[count], variables);
        count += 1;
      }

      return interpreter(expression.callee, variables)(...args);
    }
    default:
      throw new Error(`unmapped instruction ${expression}`);
  }
};
