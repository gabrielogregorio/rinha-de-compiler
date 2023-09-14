/* eslint-disable @typescript-eslint/no-magic-numbers */
import { interpreter } from './interpreter';

describe('test #Int#', () => {
  it('should run Int ast and returns 10', () => {
    expect(
      interpreter({
        kind: 'Int',
        value: 10,
      }),
    ).toEqual(10);
  });

  it('should run Int ast and returns 20', () => {
    expect(
      interpreter({
        kind: 'Int',
        value: 20,
      }),
    ).toEqual(20);
  });

  it('should run Int ast and returns 0', () => {
    expect(
      interpreter({
        kind: 'Int',
        value: 0,
      }),
    ).toEqual(0);
  });

  it('should run Int ast and returns -20', () => {
    expect(
      interpreter({
        kind: 'Int',
        value: -20,
      }),
    ).toEqual(-20);
  });

  it('should run Int ast and returns -2.2', () => {
    expect(
      interpreter({
        kind: 'Int',
        value: -2.2,
      }),
    ).toEqual(-2.2);
  });
});
