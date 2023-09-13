"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpreter = void 0;
const interpreter = (expression, variables = {}) => {
    switch (expression.kind) {
        case 'Print': {
            const value = (0, exports.interpreter)(expression.value, variables);
            console.log(value);
            return value;
        }
        case 'Binary':
            switch (expression.op) {
                case 'Eq':
                    return (0, exports.interpreter)(expression.lhs, variables) === (0, exports.interpreter)(expression.rhs, variables);
                case 'Add':
                    return (0, exports.interpreter)(expression.lhs, variables) + (0, exports.interpreter)(expression.rhs, variables);
                case 'Sub':
                    return (0, exports.interpreter)(expression.lhs, variables) - (0, exports.interpreter)(expression.rhs, variables);
                case 'Or':
                    return (0, exports.interpreter)(expression.lhs, variables) || (0, exports.interpreter)(expression.rhs, variables);
                case 'Lt':
                    return (0, exports.interpreter)(expression.lhs, variables) < (0, exports.interpreter)(expression.rhs, variables);
                default:
                    throw new Error(`unmapped operation ${expression}`);
            }
        case 'If':
            return (0, exports.interpreter)((0, exports.interpreter)(expression.condition, variables) ? expression.then : expression.otherwise, variables);
        case 'Function':
            return (...args) => {
                const localScope = Object.assign({}, variables);
                const { parameters } = expression;
                let count = 0;
                while (count < parameters.length) {
                    localScope[parameters[count].text] = args[count];
                    count += 1;
                }
                return (0, exports.interpreter)(expression.value, localScope);
            };
        case 'Let':
            variables[expression.name.text] = (0, exports.interpreter)(expression.value, variables);
            return (0, exports.interpreter)(expression.next, variables);
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
                args[count] = (0, exports.interpreter)(expression.arguments[count], variables);
                count += 1;
            }
            return (0, exports.interpreter)(expression.callee, variables)(...args);
        }
        default:
            throw new Error(`unmapped instruction ${expression}`);
    }
};
exports.interpreter = interpreter;
