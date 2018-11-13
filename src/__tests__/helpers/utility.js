import { getLastItem } from 'helpers/utility';

describe('getLastItem utiluty function', () => {
  it('shall return false for empty array', () => {
    const result = getLastItem([]);
    expect(result).toEqual(undefined);
  });
  it('shall return last element in single item array', () => {
    const result = getLastItem([1]);
    expect(result).toEqual(1);
  });
  it('shall return tuple from array of tuples', () => {
    const tuple = getLastItem([['timestamp', 'value']]);
    expect(tuple.length).toEqual(2);
    expect(tuple[0]).toEqual('timestamp');
    expect(tuple[1]).toEqual('value');
  });
});
