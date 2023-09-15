import { interpreter } from './interpreter';

describe('test #Var#', () => {
  it('should try access undefined variable', () => {
    function callInterpreter() {
      interpreter({
        kind: 'Var',
        text: 'nameVar',
      });
    }

    expect(callInterpreter).toThrowError('variable "nameVar" is not declared');
  });

  it('should run Var ast and returns false', () => {
    expect(
      interpreter({
        kind: 'Let',
        name: { text: 'myVar' },
        value: {
          kind: 'Str',
          value: 'myValueVar',
        },
        next: {
          kind: 'Var',
          text: 'myVar',
        },
      }),
    ).toEqual('myValueVar');
  });
});
