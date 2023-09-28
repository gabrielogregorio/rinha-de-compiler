/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { interpreter } from './interpreter';

describe('test #Tuple#', () => {
  it('should try get first, but error test #FirstErrorRuntime#', () => {
    function callInterpreter() {
      interpreter({
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
      interpreter({
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
    expect(
      interpreter({
        kind: 'Tuple',
        first: {
          kind: 'Int',
          value: 10,
        },
        second: {
          kind: 'Str',
          value: 'Second',
        },
      }),
    ).toStrictEqual([10, 'Second']);
  });

  it('should run Tuple ast and get first test #First#', () => {
    expect(
      interpreter({
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
      }),
    ).toStrictEqual(10);
  });

  it('should run Tuple ast and get second test #Second#', () => {
    expect(
      interpreter({
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
      }),
    ).toStrictEqual('Second');
  });
});

const tupleWithVar = {
  name: 'arquivo.rinha',
  expression: {
    kind: 'Let',
    name: {
      text: 'x',
    },
    value: {
      kind: 'Tuple',
      first: {
        kind: 'Int',
        value: 1,
      },
      second: {
        kind: 'Int',
        value: 2,
      },
    },
    next: {
      kind: 'First',
      value: {
        kind: 'Var',
        text: 'x',
      },
    },
  },
};

describe('advanceTuple', () => {
  it('should run Tuple with var', () => {
    // @ts-ignore
    expect(interpreter(tupleWithVar.expression)).toStrictEqual(1);
  });
});
