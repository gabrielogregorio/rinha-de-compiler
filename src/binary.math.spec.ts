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

  it('should run Binary and test #Sub#', () => {
    expect(interpreter({ ...baseAst, op: 'Sub' })).toEqual(1);
  });

  it('should run Binary and test #Mul#', () => {
    expect(interpreter({ ...baseAst, op: 'Mul' })).toEqual(20);
  });

  it('should run Binary and test #Div#', () => {
    expect(interpreter({ ...baseAst, op: 'Div' })).toEqual(1.25);
  });

  it('should run Binary and test #Rem#', () => {
    expect(interpreter({ ...baseAst, op: 'Rem' })).toEqual(1);
  });
});
