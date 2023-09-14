/* eslint-disable @typescript-eslint/no-magic-numbers */
import { ExpressionBinary } from 'src/types';
import { interpreter } from './interpreter';

const baseAst: ExpressionBinary = {
  kind: 'Binary',
  lhs: {
    kind: 'Bool',
    value: true,
  },
  op: 'Add',
  rhs: {
    kind: 'Bool',
    value: false,
  },
};

describe('test #BinaryLogic#', () => {
  it('should run Binary and test #Eq# `"a" == "a"`,', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Str', value: 'a' }, op: 'Eq', rhs: { kind: 'Str', value: 'a' } }),
    ).toEqual(true);
  });

  it('should run Binary and test #Eq# ``2 == 1 + 1``,', () => {
    expect(
      interpreter({
        ...baseAst,
        lhs: { kind: 'Int', value: 2 },
        op: 'Eq',
        rhs: {
          kind: 'Binary',
          lhs: {
            kind: 'Int',
            value: 1,
          },
          op: 'Add',
          rhs: {
            kind: 'Int',
            value: 1,
          },
        },
      }),
    ).toEqual(true);
  });

  it('should run Binary and test #Eq# `true == true`,', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Bool', value: true }, op: 'Eq', rhs: { kind: 'Bool', value: true } }),
    ).toEqual(true);
  });

  it('should run Binary and test #Neq# ``"a" != "b"`', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Str', value: 'a' }, op: 'Neq', rhs: { kind: 'Str', value: 'b' } }),
    ).toEqual(true);
  });

  it('should run Binary and test #Neq# ``3 != 1 + 1``', () => {
    expect(
      interpreter({
        ...baseAst,
        lhs: { kind: 'Int', value: 3 },
        op: 'Neq',
        rhs: {
          kind: 'Binary',
          lhs: {
            kind: 'Int',
            value: 1,
          },
          op: 'Add',
          rhs: {
            kind: 'Int',
            value: 1,
          },
        },
      }),
    ).toEqual(true);
  });

  it('should run Binary and test #Neq# `true != false`', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Bool', value: true }, op: 'Neq', rhs: { kind: 'Bool', value: false } }),
    ).toEqual(true);
  });

  it('should run Binary and test #Lt# `1 < 2`  ', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Int', value: 1 }, op: 'Lt', rhs: { kind: 'Int', value: 2 } }),
    ).toEqual(true);
  });

  it('should run Binary and test #Gt# `2 > 1`', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Int', value: 2 }, op: 'Gt', rhs: { kind: 'Int', value: 1 } }),
    ).toEqual(true);
  });

  it('should run Binary and test #Lte# `1 <= 2`', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Int', value: 1 }, op: 'Lte', rhs: { kind: 'Int', value: 2 } }),
    ).toEqual(true);
  });

  it('should run Binary and test #Lte# `1 <= 1`', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Int', value: 1 }, op: 'Lte', rhs: { kind: 'Int', value: 1 } }),
    ).toEqual(true);
  });

  it('should run Binary and test #Gte# `2 >= 1`', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Int', value: 2 }, op: 'Gte', rhs: { kind: 'Int', value: 1 } }),
    ).toEqual(true);
  });

  it('should run Binary and test #Gte# `1 >= 1`', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Int', value: 1 }, op: 'Gte', rhs: { kind: 'Int', value: 1 } }),
    ).toEqual(true);
  });

  it('should run Binary and test #And# `false && false`', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Bool', value: false }, op: 'And', rhs: { kind: 'Bool', value: false } }),
    ).toEqual(false);
  });

  it('should run Binary and test #And# `true && false`', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Bool', value: true }, op: 'And', rhs: { kind: 'Bool', value: false } }),
    ).toEqual(false);
  });

  it('should run Binary and test #And# `true && true`', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Bool', value: true }, op: 'And', rhs: { kind: 'Bool', value: true } }),
    ).toEqual(true);
  });

  it('should run Binary and test #Or# `false || false`', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Bool', value: false }, op: 'Or', rhs: { kind: 'Bool', value: false } }),
    ).toEqual(false);
  });

  it('should run Binary and test #Or# `false || true`', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Bool', value: false }, op: 'Or', rhs: { kind: 'Bool', value: true } }),
    ).toEqual(true);
  });

  it('should run Binary and test #Or# `true || false`', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Bool', value: true }, op: 'Or', rhs: { kind: 'Bool', value: false } }),
    ).toEqual(true);
  });

  it('should run Binary and test #Or# `true || true`', () => {
    expect(
      interpreter({ ...baseAst, lhs: { kind: 'Bool', value: true }, op: 'Or', rhs: { kind: 'Bool', value: true } }),
    ).toEqual(true);
  });
});
