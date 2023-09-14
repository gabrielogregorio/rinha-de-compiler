import { Expression, TermType } from './types';

const generateCacheKey = (calleeText, args, variables) => {
  const argsKey = JSON.stringify(args);
  const varsKey = JSON.stringify(variables);

  return `${calleeText}-${argsKey}-${varsKey}`;
};

const cacheCalledFunctions = {};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const interpreter = (expression: Expression | TermType, variables = {}) => {
  switch (expression.kind) {
    case 'Print': {
      const value = interpreter(expression.value, variables);

      let finalValue = value;
      if (typeof value === 'function') {
        finalValue = '<#closure>';
      }

      if (Array.isArray(value)) {
        finalValue = '(term, term)';
      }

      console.log(finalValue);
      return finalValue;
    }

    case 'Binary':
      // eslint-disable-next-line sonarjs/no-nested-switch
      switch (expression.op) {
        case 'Eq':
          return interpreter(expression.lhs, variables) === interpreter(expression.rhs, variables);

        case 'Add':
          return interpreter(expression.lhs, variables) + interpreter(expression.rhs, variables);

        case 'Mul':
          return interpreter(expression.lhs, variables) * interpreter(expression.rhs, variables);

        case 'Div':
          return interpreter(expression.lhs, variables) / interpreter(expression.rhs, variables);

        case 'Sub':
          return interpreter(expression.lhs, variables) - interpreter(expression.rhs, variables);

        case 'Or':
          return interpreter(expression.lhs, variables) || interpreter(expression.rhs, variables);

        case 'Lt':
          return interpreter(expression.lhs, variables) < interpreter(expression.rhs, variables);

        case 'Rem':
          return interpreter(expression.lhs, variables) % interpreter(expression.rhs, variables);

        default:
          throw new Error(`unmapped operation ${expression}`);
      }

    case 'Tuple': {
      return [interpreter(expression.first, variables), interpreter(expression.second, variables)];
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

      // @ts-ignore
      const cacheKey = generateCacheKey(expression.callee.text, args, variables);

      const cacheResponse = cacheCalledFunctions[cacheKey];
      if (cacheResponse) {
        return cacheResponse;
      }

      const response = interpreter(expression.callee, variables)(...args);
      cacheCalledFunctions[cacheKey] = response;
      return response;
    }
    default:
      throw new Error(`unmapped instruction ${expression}`);
  }
};
