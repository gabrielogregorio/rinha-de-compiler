import { interpreter } from './interpreter';

describe('test #Str#', () => {
  it('should run Str ast and returns false', () => {
    expect(
      interpreter({
        kind: 'Str',
        value: '',
      }),
    ).toEqual('');
  });

  it('should run Str ast and returns true', () => {
    expect(
      interpreter({
        kind: 'Str',
        value: 'abc item',
      }),
    ).toEqual('abc item');
  });
});
