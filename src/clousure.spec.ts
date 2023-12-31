import { ExpressionBase } from './types';
import { interpreter } from './interpreter';

const program: ExpressionBase = {
  name: 'ata.rinha',
  expression: {
    kind: 'Let',
    name: { text: 'm', location: { start: 4, end: 5, filename: 'ata.rinha' } },
    value: { kind: 'Int', value: 10, location: { start: 8, end: 10, filename: 'ata.rinha' } },
    next: {
      kind: 'Let',
      name: { text: 'test', location: { start: 16, end: 20, filename: 'ata.rinha' } },
      value: {
        kind: 'Function',
        parameters: [{ text: 'n', location: { start: 27, end: 28, filename: 'ata.rinha' } }],
        value: {
          kind: 'Binary',
          lhs: { kind: 'Var', text: 'n', location: { start: 39, end: 40, filename: 'ata.rinha' } },
          op: 'Add',
          rhs: { kind: 'Var', text: 'm', location: { start: 43, end: 44, filename: 'ata.rinha' } },
          location: { start: 39, end: 44, filename: 'ata.rinha' },
        },
        location: { start: 23, end: 46, filename: 'ata.rinha' },
      },
      next: {
        kind: 'Print',
        value: {
          kind: 'Call',
          callee: { kind: 'Var', text: 'test', location: { start: 54, end: 58, filename: 'ata.rinha' } },
          arguments: [{ kind: 'Int', value: 2, location: { start: 59, end: 60, filename: 'ata.rinha' } }],
          location: { start: 54, end: 61, filename: 'ata.rinha' },
        },
        location: { start: 48, end: 62, filename: 'ata.rinha' },
      },
      location: { start: 12, end: 62, filename: 'ata.rinha' },
    },
    location: { start: 0, end: 62, filename: 'ata.rinha' },
  },
  location: { start: 0, end: 62, filename: 'ata.rinha' },
};

describe('InterpreterFib', () => {
  it('should run clousure() ast and returns 12', () => {
    const EXPECTED_RESULT_FIB = 12;

    expect(interpreter(program.expression)).toEqual(EXPECTED_RESULT_FIB);
  });
});

const program2 = {
  expression: {
    kind: 'Let',
    name: { text: 'sum' },
    value: {
      kind: 'Function',
      parameters: [{ text: 'a' }, { text: 'b' }],
      value: {
        kind: 'Print',
        value: {
          kind: 'Binary',
          lhs: { kind: 'Var', text: 'a' },
          op: 'Add',
          rhs: { kind: 'Var', text: 'b' },
        },
      },
    },
    next: {
      kind: 'Let',
      name: { text: '_' },
      value: {
        kind: 'Call',
        callee: { kind: 'Var', text: 'sum' },
        arguments: [
          { kind: 'Int', value: 10 },
          { kind: 'Int', value: 10 },
        ],
      },
      next: {
        kind: 'Call',
        callee: { kind: 'Var', text: 'sum' },
        arguments: [
          { kind: 'Int', value: 10 },
          { kind: 'Int', value: 10 },
        ],
      },
    },
  },
};

describe('InterpreterFib', () => {
  it('should run function', () => {
    const EXPECTED_RESULT_FIB = 20;

    // @ts-ignore
    expect(interpreter(program2.expression)).toEqual(EXPECTED_RESULT_FIB);
  });
});
