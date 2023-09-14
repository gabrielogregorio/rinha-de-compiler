/* eslint-disable @typescript-eslint/no-magic-numbers */
import { ExpressionBinary } from 'src/types';
import { interpreter } from './interpreter';

const baseAst: ExpressionBinary = {
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
    expect(interpreter({ ...baseAst, op: 'Add' })).toEqual(9);
  });

  it('should run Binary and test #Add# (`"a" + 2 = "a2"`)', () => {
    expect(
      interpreter({
        ...baseAst,
        lhs: {
          kind: 'Str',
          value: 'a',
        },
        op: 'Add',
        rhs: {
          kind: 'Int',
          value: 2,
        },
      }),
    ).toEqual('a2');
  });

  it('should run Binary and test #Add# `2 + "a" = "2a"`', () => {
    expect(
      interpreter({
        ...baseAst,
        lhs: {
          kind: 'Int',
          value: 2,
        },
        op: 'Add',
        rhs: {
          kind: 'Str',
          value: 'a',
        },
      }),
    ).toEqual('2a');
  });

  it('should run Binary and test #Add# `"a" + "b" = "ab"``', () => {
    expect(
      interpreter({
        ...baseAst,
        lhs: {
          kind: 'Str',
          value: 'a',
        },
        op: 'Add',
        rhs: {
          kind: 'Str',
          value: 'b',
        },
      }),
    ).toEqual('ab');
  });

  it('should run Binary and test #Sub#', () => {
    expect(interpreter({ ...baseAst, op: 'Sub' })).toEqual(1);
  });

  it('should run Binary and test #Sub# `0 - 1 = -1` ', () => {
    expect(
      interpreter({
        ...baseAst,
        lhs: {
          kind: 'Int',
          value: 0,
        },
        op: 'Sub',
        rhs: {
          kind: 'Int',
          value: 1,
        },
      }),
    ).toEqual(-1);
  });

  it('should run Binary and test #Mul#', () => {
    expect(interpreter({ ...baseAst, op: 'Mul' })).toEqual(20);
  });

  it('should run Binary and test #Div# `3 / 2 = 1`', () => {
    expect(
      interpreter({
        ...baseAst,
        lhs: {
          kind: 'Int',
          value: 3,
        },
        op: 'Div',
        rhs: {
          kind: 'Int',
          value: 2,
        },
      }),
    ).toEqual(1);
  });

  it('should run Binary and test #Rem#', () => {
    expect(interpreter({ ...baseAst, op: 'Rem' })).toEqual(1);
  });
});
