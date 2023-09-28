"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("./interpreter");
const RETURN_THEN = 'RETURN_THEN';
const RETURN_OTHERWISE = 'RETURN_OTHERWISE';
describe('test #If#', () => {
    it('should run If ast return then', () => {
        const response = (0, interpreter_1.interpreter)({
            kind: 'If',
            condition: {
                kind: 'Bool',
                value: true,
            },
            then: {
                kind: 'Str',
                value: RETURN_THEN,
            },
            otherwise: {
                kind: 'Str',
                value: RETURN_OTHERWISE,
            },
        });
        expect(response).toEqual(RETURN_THEN);
    });
    it('should run If ast return otherwise', () => {
        const response = (0, interpreter_1.interpreter)({
            kind: 'If',
            condition: {
                kind: 'Bool',
                value: false,
            },
            then: {
                kind: 'Str',
                value: RETURN_THEN,
            },
            otherwise: {
                kind: 'Str',
                value: RETURN_OTHERWISE,
            },
        });
        expect(response).toEqual(RETURN_OTHERWISE);
    });
});
