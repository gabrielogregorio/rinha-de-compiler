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
            if (expression.op === 'Eq') {
                return (0, exports.interpreter)(expression.lhs, variables) === (0, exports.interpreter)(expression.rhs, variables);
            }
            if (expression.op === 'Add') {
                return (0, exports.interpreter)(expression.lhs, variables) + (0, exports.interpreter)(expression.rhs, variables);
            }
            if (expression.op === 'Sub') {
                return (0, exports.interpreter)(expression.lhs, variables) - (0, exports.interpreter)(expression.rhs, variables);
            }
            if (expression.op === 'Or') {
                return (0, exports.interpreter)(expression.lhs, variables) || (0, exports.interpreter)(expression.rhs, variables);
            }
            if (expression.op === 'Lt') {
                return (0, exports.interpreter)(expression.lhs, variables) < (0, exports.interpreter)(expression.rhs, variables);
            }
            throw new Error(`unmapped operation ${expression}`);
        case 'If':
            return (0, exports.interpreter)((0, exports.interpreter)(expression.condition, variables) ? expression.then : expression.otherwise, variables);
        case 'Function':
            return (...args) => {
                const localScope = Object.assign({}, variables);
                for (let count = 0; count < expression.parameters.length; count += 1) {
                    localScope[expression.parameters[count].text] = args[count];
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
            const args = new Array(expression.arguments.length);
            for (let count = 0; count < expression.arguments.length; count += 1) {
                args[count] = (0, exports.interpreter)(expression.arguments[count], variables);
            }
            return (0, exports.interpreter)(expression.callee, variables)(...args);
        }
        default:
            throw new Error(`unmapped instruction ${expression}`);
    }
};
exports.interpreter = interpreter;
