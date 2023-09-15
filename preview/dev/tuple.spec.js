"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("./interpreter");
describe('test #Tuple#', () => {
    it('should try get first, but error test #FirstErrorRuntime#', () => {
        function callInterpreter() {
            (0, interpreter_1.interpreter)({
                kind: 'First',
                value: {
                    kind: 'Str',
                    value: 'first',
                },
            });
        }
        expect(callInterpreter).toThrowError('First needs use only Tuple');
    });
    it('should try get second, but error test #SecondErrorRuntime#', () => {
        function callInterpreter() {
            (0, interpreter_1.interpreter)({
                kind: 'Second',
                value: {
                    kind: 'Str',
                    value: 'second',
                },
            });
        }
        expect(callInterpreter).toThrowError('Second needs use only Tuple');
    });
    it('should run Tuple ast return then', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Tuple',
            first: {
                kind: 'Int',
                value: 10,
            },
            second: {
                kind: 'Str',
                value: 'Second',
            },
        })).toStrictEqual([10, 'Second']);
    });
    it('should run Tuple ast and get first', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'First',
            value: {
                kind: 'Tuple',
                first: {
                    kind: 'Int',
                    value: 10,
                },
                second: {
                    kind: 'Str',
                    value: 'Second',
                },
            },
        })).toStrictEqual({ kind: 'Int', value: 10 });
    });
    it('should run Tuple ast and get second', () => {
        expect((0, interpreter_1.interpreter)({
            kind: 'Second',
            value: {
                kind: 'Tuple',
                first: {
                    kind: 'Int',
                    value: 10,
                },
                second: {
                    kind: 'Str',
                    value: 'Second',
                },
            },
        })).toStrictEqual({ kind: 'Str', value: 'Second' });
    });
});
