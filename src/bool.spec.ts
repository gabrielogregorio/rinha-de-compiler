import { interpreter } from './interpreter';

describe('test #Bool#', () => {
  it('should run Bool ast and returns false', () => {
    expect(
      interpreter({
        kind: 'Bool',
        value: false,
      }),
    ).toEqual(false);
  });

  it('should run Bool ast and returns true', () => {
    expect(
      interpreter({
        kind: 'Bool',
        value: true,
      }),
    ).toEqual(true);
  });
});
