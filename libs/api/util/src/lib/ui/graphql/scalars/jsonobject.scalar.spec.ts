import { FloatValueNode, IntValueNode, ListValueNode } from 'graphql';
import { JSONObjectScalar } from './jsonobject.scalar';
import {
  booleanValue,
  booleanValueNode,
  enumValueNode,
  floatValue,
  floatValueNode,
  getObjectValueNode,
  intValue,
  intValueNode,
  listValueNode,
  nullValueNode,
  stringValue,
  stringValueNode,
  variableValueNode,
} from '@feelback-app/api/testing';

describe('JSONObjectScalar', () => {
  let scalar: JSONObjectScalar;

  beforeEach(() => {
    scalar = new JSONObjectScalar();
  });

  it('should be defined', () => {
    expect(scalar).toBeDefined();
  });

  describe('parseValue', () => {
    it('should throw error if value is not an object', () => {
      expect(() => scalar.parseValue([])).toThrow(TypeError);
      expect(() => scalar.parseValue([1])).toThrow(TypeError);
    });

    it('should return value', () => {
      const value = { a: 'val' };
      expect(scalar.parseValue(value)).toStrictEqual(value);
    });
  });

  describe('serialize', () => {
    it('should throw error if value is not an object', () => {
      expect(() => scalar.serialize([])).toThrow(TypeError);
      expect(() => scalar.serialize([1])).toThrow(TypeError);
    });

    it('should return value', () => {
      const value = { a: 'val' };
      expect(scalar.serialize(value)).toStrictEqual(value);
    });
  });

  describe('parseLiteral', () => {
    it('should return empty object if value node is not object', () => {
      expect(scalar.parseLiteral(stringValueNode)).toStrictEqual({});
      expect(scalar.parseLiteral(intValueNode)).toStrictEqual({});
      expect(scalar.parseLiteral(floatValueNode)).toStrictEqual({});
      expect(scalar.parseLiteral(variableValueNode)).toStrictEqual({});
      expect(scalar.parseLiteral(booleanValueNode)).toStrictEqual({});
      expect(scalar.parseLiteral(nullValueNode)).toStrictEqual({});
      expect(scalar.parseLiteral(enumValueNode)).toStrictEqual({});
      expect(scalar.parseLiteral(listValueNode)).toStrictEqual({});
    });

    it('should return object if value node is object', () => {
      const objectValueNode = getObjectValueNode([['a', nullValueNode]]);
      expect(scalar.parseLiteral(objectValueNode)).toStrictEqual({ a: null });
    });
  });

  describe('parseObject', () => {
    describe('StringValueNode', () => {
      it('should return string', () => {
        const result = scalar.parseObject(stringValueNode);
        expect(result).toStrictEqual(stringValue);
      });
    });

    describe('BooleanValueNode', () => {
      it('should return boolean', () => {
        const result = scalar.parseObject(booleanValueNode);
        expect(result).toStrictEqual(booleanValue);
      });
    });

    describe('IntValueNode', () => {
      it('should return int', () => {
        const result = scalar.parseObject(intValueNode);
        expect(result).toStrictEqual(intValue);
      });

      it('should return int value ignoring white spaces', () => {
        const valueNode: IntValueNode = {
          kind: 'IntValue',
          value: '\t 123  \n',
        };
        const result = scalar.parseObject(valueNode);
        expect(result).toStrictEqual(123);
      });

      it('should return NaN if int value is not a number', () => {
        const valueNode: IntValueNode = {
          kind: 'IntValue',
          value: 'invalid',
        };
        const result = scalar.parseObject(valueNode);
        expect(result).toBeNaN();
      });

      it('should return NaN if int value is infinity', () => {
        const number = Infinity;
        const valueNode: IntValueNode = {
          kind: 'IntValue',
          value: number.toString(),
        };
        const result = scalar.parseObject(valueNode);
        expect(result).toBeNaN();
      });
    });

    describe('FloatValueNode', () => {
      it('should return float', () => {
        const result = scalar.parseObject(floatValueNode);
        expect(result).toStrictEqual(floatValue);
      });

      it('should return float value ignoring white spaces', () => {
        const valueNode: FloatValueNode = {
          kind: 'FloatValue',
          value: '\t 123.5  \n',
        };
        const result = scalar.parseObject(valueNode);
        expect(result).toStrictEqual(123.5);
      });

      it('should return NaN if int value is not a number', () => {
        const valueNode: FloatValueNode = {
          kind: 'FloatValue',
          value: 'invalid',
        };
        const result = scalar.parseObject(valueNode);
        expect(result).toBeNaN();
      });

      it('should return NaN if int value is infinity', () => {
        const number = Infinity;
        const valueNode: FloatValueNode = {
          kind: 'FloatValue',
          value: number.toString(),
        };
        const result = scalar.parseObject(valueNode);
        expect(result).toStrictEqual(number);
      });
    });

    describe('ObjectValueNode', () => {
      it('should return empty object if no fields are present', () => {
        const valueNode = getObjectValueNode([]);
        const result = scalar.parseObject(valueNode);
        expect(result).toStrictEqual({});
      });

      it('should return object with 1 field with value null', () => {
        const valueNode = getObjectValueNode([['a', nullValueNode]]);
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual({ a: null });
      });

      it('should return object with 1 field with value non null', () => {
        const valueNode = getObjectValueNode([['a', intValueNode]]);
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual({ a: intValue });
      });

      it('should return object with 1 field with value object', () => {
        const nestedFieldValueNode = getObjectValueNode([['x', nullValueNode]]);
        const valueNode = getObjectValueNode([['a', nestedFieldValueNode]]);
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual({ a: { x: null } });
      });

      it('should return object with multiple fields', () => {
        const fieldValueNode = getObjectValueNode([]);
        const valueNode = getObjectValueNode([
          ['a', nullValueNode],
          ['b', fieldValueNode],
        ]);
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual({ a: null, b: {} });
      });

      it('should return object with overwritten values for identical fieldnames', () => {
        const valueNode = getObjectValueNode([
          ['a', nullValueNode],
          ['a', intValueNode],
        ]);
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual({ a: intValue });
      });
    });

    describe('ListValueNode', () => {
      it('should return empty list', () => {
        const result = scalar.parseObject(listValueNode);
        expect(result).toStrictEqual([]);
      });

      it('should return list with 1 element', () => {
        const valueNode: ListValueNode = {
          kind: 'ListValue',
          values: [stringValueNode],
        };
        const result = scalar.parseObject(valueNode);
        expect(result).toStrictEqual([stringValue]);
      });

      it('should return list with multiple elements', () => {
        const valueNode: ListValueNode = {
          kind: 'ListValue',
          values: [stringValueNode, booleanValueNode],
        };
        const result = scalar.parseObject(valueNode);
        expect(result).toStrictEqual([stringValue, booleanValue]);
      });
    });

    describe('NullValueNode', () => {
      it('should return null', () => {
        const result = scalar.parseObject(nullValueNode);
        expect(result).toBeNull();
      });
    });

    describe('VariableValueNode', () => {
      it('should return undefined', () => {
        const result = scalar.parseObject(variableValueNode);
        expect(result).toBeUndefined();
      });
    });

    describe('EnumValueNode', () => {
      it('should return undefined', () => {
        const result = scalar.parseObject(enumValueNode);
        expect(result).toBeUndefined();
      });
    });
  });

  describe('ensureObject', () => {
    it('should throw error if value is null', () => {
      expect(() => scalar.ensureObject(null)).toThrow(TypeError);
    });

    it('should throw error if value is an array', () => {
      expect(() => scalar.ensureObject([])).toThrow(TypeError);
      expect(() => scalar.ensureObject([1])).toThrow(TypeError);
    });
  });
});
