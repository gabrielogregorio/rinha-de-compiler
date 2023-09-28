"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("./interpreter");
const baseAst = {
    kind: 'Binary',
    lhs: {
        kind: 'Int',
        value: 5,
    },
    op: 'Add',
    rhs: {
        kind: 'Int',
        value: 4,
    },
};
describe('test #Binary#', () => {
    it('should run Binary and test #Add#', () => {
        expect((0, interpreter_1.interpreter)(Object.assign(Object.assign({}, baseAst), { op: 'Add' }))).toEqual(9);
    });
    it('should run Binary and test #Add# (`"a" + 2 = "a2"`)', () => {
        expect((0, interpreter_1.interpreter)(Object.assign(Object.assign({}, baseAst), { lhs: {
                kind: 'Str',
                value: 'a',
            }, op: 'Add', rhs: {
                kind: 'Int',
                value: 2,
            } }))).toEqual('a2');
    });
    it('should run Binary and test #Add# `2 + "a" = "2a"`', () => {
        expect((0, interpreter_1.interpreter)(Object.assign(Object.assign({}, baseAst), { lhs: {
                kind: 'Int',
                value: 2,
            }, op: 'Add', rhs: {
                kind: 'Str',
                value: 'a',
            } }))).toEqual('2a');
    });
    it('should run Binary and test #Add# `"a" + "b" = "ab"``', () => {
        expect((0, interpreter_1.interpreter)(Object.assign(Object.assign({}, baseAst), { lhs: {
                kind: 'Str',
                value: 'a',
            }, op: 'Add', rhs: {
                kind: 'Str',
                value: 'b',
            } }))).toEqual('ab');
    });
    it('should run Binary and test #Sub#', () => {
        expect((0, interpreter_1.interpreter)(Object.assign(Object.assign({}, baseAst), { op: 'Sub' }))).toEqual(1);
    });
    it('should run Binary and test #Sub# `0 - 1 = -1` ', () => {
        expect((0, interpreter_1.interpreter)(Object.assign(Object.assign({}, baseAst), { lhs: {
                kind: 'Int',
                value: 0,
            }, op: 'Sub', rhs: {
                kind: 'Int',
                value: 1,
            } }))).toEqual(-1);
    });
    it('should run Binary and test #Mul#', () => {
        expect((0, interpreter_1.interpreter)(Object.assign(Object.assign({}, baseAst), { op: 'Mul' }))).toEqual(20);
    });
    it('should run Binary and test #Div# `3 / 2 = 1`', () => {
        expect((0, interpreter_1.interpreter)(Object.assign(Object.assign({}, baseAst), { lhs: {
                kind: 'Int',
                value: 3,
            }, op: 'Div', rhs: {
                kind: 'Int',
                value: 2,
            } }))).toEqual(1);
    });
    it('should run Binary and test #Rem#', () => {
        expect((0, interpreter_1.interpreter)(Object.assign(Object.assign({}, baseAst), { op: 'Rem' }))).toEqual(1);
    });
});
