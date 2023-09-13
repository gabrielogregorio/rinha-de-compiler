import { ExpressionBase } from './types';
import { interpreter } from './interpreter';

const program: ExpressionBase = {
  name: 'print.rinha.rinha',
  expression: {
    kind: 'Print',
    value: {
      kind: 'Str',
      value: 'Hello world',
      location: {
        start: 7,
        end: 20,
        filename: 'print.rinh2a',
      },
    },
    location: {
      start: 0,
      end: 21,
      filename: 'print.rinha',
    },
  },
  location: {
    start: 0,
    end: 21,
    filename: 'print.rinha',
  },
};

describe('InterpreterPrint', () => {
  it('should run print() ast and returns "Hello world"', () => {
    expect(interpreter(program.expression)).toEqual('Hello world');
  });
});
