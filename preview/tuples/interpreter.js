"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpreter = void 0;
const generateCacheKey = (calleeText, args, variables) => calleeText + JSON.stringify(args) + JSON.stringify(variables);
const cacheCalledFunctions = new Map();
const interpreter = (expression, variables = {}) => {
    switch (expression.kind) {
        case 'Print': {
            const value = (0, exports.interpreter)(expression.value, variables);
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
            switch (expression.op) {
                case 'And':
                    return (0, exports.interpreter)(expression.lhs, variables) && (0, exports.interpreter)(expression.rhs, variables);
                case 'Or':
                    return (0, exports.interpreter)(expression.lhs, variables) || (0, exports.interpreter)(expression.rhs, variables);
                case 'Eq':
                    return (0, exports.interpreter)(expression.lhs, variables) === (0, exports.interpreter)(expression.rhs, variables);
                case 'Add':
                    return (0, exports.interpreter)(expression.lhs, variables) + (0, exports.interpreter)(expression.rhs, variables);
                case 'Mul':
                    return (0, exports.interpreter)(expression.lhs, variables) * (0, exports.interpreter)(expression.rhs, variables);
                case 'Div':
                    if (expression.lhs.kind === 'Int' && expression.rhs.kind === 'Int') {
                        return Math.floor((0, exports.interpreter)(expression.lhs, variables) / (0, exports.interpreter)(expression.rhs, variables));
                    }
                    return (0, exports.interpreter)(expression.lhs, variables) / (0, exports.interpreter)(expression.rhs, variables);
                case 'Sub':
                    return (0, exports.interpreter)(expression.lhs, variables) - (0, exports.interpreter)(expression.rhs, variables);
                case 'Neq':
                    return (0, exports.interpreter)(expression.lhs, variables) !== (0, exports.interpreter)(expression.rhs, variables);
                case 'Lt':
                    return (0, exports.interpreter)(expression.lhs, variables) < (0, exports.interpreter)(expression.rhs, variables);
                case 'Lte':
                    return (0, exports.interpreter)(expression.lhs, variables) <= (0, exports.interpreter)(expression.rhs, variables);
                case 'Gt':
                    return (0, exports.interpreter)(expression.lhs, variables) > (0, exports.interpreter)(expression.rhs, variables);
                case 'Gte':
                    return (0, exports.interpreter)(expression.lhs, variables) >= (0, exports.interpreter)(expression.rhs, variables);
                case 'Rem':
                    return (0, exports.interpreter)(expression.lhs, variables) % (0, exports.interpreter)(expression.rhs, variables);
                default:
                    throw new Error(`unmapped operation ${expression}`);
            }
        case 'Tuple': {
            return [(0, exports.interpreter)(expression.first, variables), (0, exports.interpreter)(expression.second, variables)];
        }
        case 'First': {
            const result = (0, exports.interpreter)(expression.value, variables);
            if (Array.isArray(result)) {
                return result[0];
            }
            throw new Error(`First needs use only Tuple`);
        }
        case 'Second': {
            const result = (0, exports.interpreter)(expression.value, variables);
            if (Array.isArray(result)) {
                return result[1];
            }
            throw new Error(`Second needs use only Tuple`);
        }
        case 'If':
            return (0, exports.interpreter)((0, exports.interpreter)(expression.condition, variables) ? expression.then : expression.otherwise, variables);
        case 'Function':
            return (...args) => {
                const localScope = Object.assign({}, variables);
                const { parameters } = expression;
                const len = parameters.length;
                for (let count = 0; count < len; count += 1) {
                    localScope[parameters[count].text] = args[count];
                }
                return (0, exports.interpreter)(expression.value, localScope);
            };
        case 'Let':
            variables[expression.name.text] = (0, exports.interpreter)(expression.value, variables);
            return (0, exports.interpreter)(expression.next, variables);
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
                args[count] = (0, exports.interpreter)(expression.arguments[count], variables);
                count += 1;
            }
            const cacheKey = generateCacheKey(expression.callee.text, args, variables);
            if (cacheCalledFunctions.has(cacheKey)) {
                return cacheCalledFunctions.get(cacheKey);
            }
            const response = (0, exports.interpreter)(expression.callee, variables)(...args);
            cacheCalledFunctions.set(cacheKey, response);
            return response;
        }
        default:
            throw new Error(`unmapped instruction ${expression}`);
    }
};
exports.interpreter = interpreter;
