import { StringHelper } from './string.helper';
import { validate } from 'uuid';

describe('StringHelper', () => {
  it('should generate strings of the proper length', () => {
    expect(StringHelper.randomString().length).toBe(10);

    expect(StringHelper.randomString(1).length).toBe(1);
    expect(StringHelper.randomString(10).length).toBe(10);
    expect(StringHelper.randomString(20).length).toBe(20);
    expect(StringHelper.randomString(50).length).toBe(50);
  });

  it('should return an empty string for negative length', () => {
    expect(StringHelper.randomString(-10)).toEqual('');
  });

  it('should use only valid chars', () => {
    let str = StringHelper.randomString(5, 'a');
    expect(str).toMatch(/[a]+/);
    expect(str).toHaveLength(5);

    str = StringHelper.randomString(50, 'abc');
    expect(str).toMatch(/[abc]+/);
    expect(str).toHaveLength(50);

    str = StringHelper.randomString(50, 'abcdefghijklmnopqrstuvwxyz');
    expect(str).toMatch(/[a-z]+/);
    expect(str).toHaveLength(50);

    str = StringHelper.randomString(50, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    expect(str).toMatch(/[A-Z]+/);
    expect(str).toHaveLength(50);

    str = StringHelper.randomString(50, '0123456789');
    expect(str).toMatch(/[0-9]+/);
    expect(str).toHaveLength(50);

    str = StringHelper.randomString(50);
    expect(str).toMatch(/[a-zA-Z0-9]+/);
    expect(str).toHaveLength(50);
  });

  it('should generate a valid uuid4', () => {
    const uuid = StringHelper.uuid4();
    expect(uuid).toBeTruthy();
    expect(typeof uuid).toEqual('string');
    expect(validate(uuid)).toBeTruthy();
  });
});
