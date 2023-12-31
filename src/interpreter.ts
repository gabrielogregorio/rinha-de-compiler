import { Expression, TermType } from './types';

const generateCacheKey = (calleeText, args, variables) => calleeText + JSON.stringify(args) + JSON.stringify(variables);

const cacheCalledFunctions = new Map();

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
        finalValue = `(${value[0]}, ${value[1]})`;
      }

      console.log(finalValue);
      return finalValue;
    }

    case 'Binary':
      // eslint-disable-next-line sonarjs/no-nested-switch
      switch (expression.op) {
        case 'And':
          return interpreter(expression.lhs, variables) && interpreter(expression.rhs, variables);

        case 'Or':
          return interpreter(expression.lhs, variables) || interpreter(expression.rhs, variables);

        case 'Eq':
          return interpreter(expression.lhs, variables) === interpreter(expression.rhs, variables);

        case 'Add':
          return interpreter(expression.lhs, variables) + interpreter(expression.rhs, variables);

        case 'Mul':
          return interpreter(expression.lhs, variables) * interpreter(expression.rhs, variables);

        case 'Div':
          if (expression.lhs.kind === 'Int' && expression.rhs.kind === 'Int') {
            return Math.floor(interpreter(expression.lhs, variables) / interpreter(expression.rhs, variables));
          }
          return interpreter(expression.lhs, variables) / interpreter(expression.rhs, variables);

        case 'Sub':
          return interpreter(expression.lhs, variables) - interpreter(expression.rhs, variables);

        case 'Neq':
          return interpreter(expression.lhs, variables) !== interpreter(expression.rhs, variables);

        case 'Lt':
          return interpreter(expression.lhs, variables) < interpreter(expression.rhs, variables);

        case 'Lte':
          return interpreter(expression.lhs, variables) <= interpreter(expression.rhs, variables);

        case 'Gt':
          return interpreter(expression.lhs, variables) > interpreter(expression.rhs, variables);

        case 'Gte':
          return interpreter(expression.lhs, variables) >= interpreter(expression.rhs, variables);

        case 'Rem':
          return interpreter(expression.lhs, variables) % interpreter(expression.rhs, variables);

        default:
          throw new Error(`unmapped operation ${expression}`);
      }

    case 'Tuple': {
      return [interpreter(expression.first, variables), interpreter(expression.second, variables)];
    }

    case 'First': {
      const result = interpreter(expression.value, variables);
      if (Array.isArray(result)) {
        return result[0];
      }

      throw new Error(`First needs use only Tuple`);
    }

    case 'Second': {
      const result = interpreter(expression.value, variables);
      if (Array.isArray(result)) {
        return result[1];
      }

      throw new Error(`Second needs use only Tuple`);
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

        const len = parameters.length;
        for (let count = 0; count < len; count += 1) {
          localScope[parameters[count].text] = args[count];
        }

        return interpreter(expression.value, localScope);
      };

    case 'Let':
      // eslint-disable-next-line no-param-reassign
      variables[expression.name.text] = interpreter(expression.value, variables);

      return interpreter(expression.next, variables);

    case 'Int':
      if (!Number.isInteger(expression.value)) {
        throw new Error('number is not integer');
      }
      return expression.value;
    case 'Str':
    case 'Bool':
      return expression.value;

    case 'Var':
      if (expression.text in variables) {
        return variables[expression.text];
      }
      throw new Error(`variable "${expression.text}" is not declared`);

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

      if (cacheCalledFunctions.has(cacheKey)) {
        return cacheCalledFunctions.get(cacheKey);
      }

      const response = interpreter(expression.callee, variables)(...args);
      cacheCalledFunctions.set(cacheKey, response);
      return response;
    }
    default:
      throw new Error(`unmapped instruction ${expression}`);
  }
};
