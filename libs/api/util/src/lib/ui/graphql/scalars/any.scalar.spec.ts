import { AnythingScalar } from './any.scalar';
import {
  BooleanValueNode,
  EnumValueNode,
  FloatValueNode,
  IntValueNode,
  ListValueNode,
  NameNode,
  NullValueNode,
  ObjectFieldNode,
  ObjectValueNode,
  StringValueNode,
  ValueNode,
  VariableNode,
} from 'graphql';

// Used to generate ObjectValueNodes
const getObjectValueNode = (fields: [string, ValueNode][]): ObjectValueNode => {
  const generatedFields = fields.map((t) => {
    const fieldNameNode: NameNode = {
      kind: 'Name',
      value: t[0],
    };
    const objectField: ObjectFieldNode = {
      kind: 'ObjectField',
      name: fieldNameNode,
      value: t[1],
    };
    return objectField;
  });

  const valueNode: ObjectValueNode = {
    kind: 'ObjectValue',
    fields: generatedFields,
  };

  return valueNode;
};

describe('AnythingScalar', () => {
  let scalar: AnythingScalar;

  beforeEach(() => {
    scalar = new AnythingScalar();
  });

  it('should be defined', () => {
    expect(scalar).toBeDefined();
  });

  describe('parseValue', () => {
    it('should return value', () => {
      const stringValue = 'string';
      expect(scalar.parseValue(stringValue)).toStrictEqual(stringValue);
      const numberValue = 1234;
      expect(scalar.parseValue(numberValue)).toStrictEqual(numberValue);
    });
  });

  describe('serialize', () => {
    it('should return value', () => {
      const stringValue = 'string';
      expect(scalar.serialize(stringValue)).toStrictEqual(stringValue);
      const numberValue = 1234;
      expect(scalar.serialize(numberValue)).toStrictEqual(numberValue);
    });
  });

  describe('parseLiteral', () => {
    describe('StringValueNode', () => {
      it('should return string value', () => {
        const stringValue = 'stringValueNode';
        const valueNode: StringValueNode = {
          kind: 'StringValue',
          value: stringValue,
        };
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual(stringValue);
      });
    });

    describe('BooleanValueNode', () => {
      it('should return boolean value', () => {
        const booleanValue = true;
        const valueNode: BooleanValueNode = {
          kind: 'BooleanValue',
          value: booleanValue,
        };
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual(booleanValue);
      });
    });

    describe('IntValueNode', () => {
      it('should return int value', () => {
        const intValue = 123;
        const valueNode: IntValueNode = {
          kind: 'IntValue',
          value: intValue.toString(),
        };
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual(intValue);
      });

      it('should return NaN if int value is not a number', () => {
        const intValue = 'invalid';
        const valueNode: IntValueNode = {
          kind: 'IntValue',
          value: intValue,
        };
        const result = scalar.parseLiteral(valueNode);
        expect(result).toBeNaN();
      });
    });

    describe('FloatValueNode', () => {
      it('should return float value', () => {
        const floatValue = 123.75;
        const valueNode: FloatValueNode = {
          kind: 'FloatValue',
          value: floatValue.toString(),
        };
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual(floatValue);
      });

      it('should return NaN if float value is not a number', () => {
        const floatValue = 'invalid';
        const valueNode: FloatValueNode = {
          kind: 'FloatValue',
          value: floatValue,
        };
        const result = scalar.parseLiteral(valueNode);
        expect(result).toBeNaN();
      });
    });

    describe('ObjectValueNode', () => {
      it('should return empty object if no fields', () => {
        const valueNode = getObjectValueNode([]);
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual({});
      });

      it('should return object with 1 field with value null', () => {
        const fieldValueNode: NullValueNode = {
          kind: 'NullValue',
        };
        const valueNode = getObjectValueNode([['a', fieldValueNode]]);
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual({ a: null });
      });

      it('should return object with 1 field with value non null', () => {
        const intValue = 12;
        const fieldValueNode: IntValueNode = {
          kind: 'IntValue',
          value: intValue.toString(),
        };
        const valueNode = getObjectValueNode([['a', fieldValueNode]]);
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual({ a: intValue });
      });

      it('should return object with 1 field with value object', () => {
        const nestedFieldNode: NullValueNode = {
          kind: 'NullValue',
        };
        const nestedFieldValueNode = getObjectValueNode([
          ['x', nestedFieldNode],
        ]);
        const valueNode = getObjectValueNode([['a', nestedFieldValueNode]]);
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual({ a: { x: null } });
      });

      it('should return object with multiple fields', () => {
        const fieldValueNodeA: NullValueNode = {
          kind: 'NullValue',
        };
        const fieldValueNodeB = getObjectValueNode([]);
        const valueNode = getObjectValueNode([
          ['a', fieldValueNodeA],
          ['b', fieldValueNodeB],
        ]);
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual({ a: null, b: {} });
      });

      it('should return object with overwritten values for identical fieldnames', () => {
        const nullFieldValueNode: NullValueNode = {
          kind: 'NullValue',
        };
        const intValue = 234;
        const intFieldValueNode: IntValueNode = {
          kind: 'IntValue',
          value: intValue.toString(),
        };
        const valueNode = getObjectValueNode([
          ['a', nullFieldValueNode],
          ['a', intFieldValueNode],
        ]);
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual({ a: intValue });
      });
    });

    describe('ListValueNode', () => {
      it('should return empty list if no values are contained', () => {
        const valueNode: ListValueNode = {
          kind: 'ListValue',
          values: [],
        };
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual([]);
      });

      it('should return list with 1 element', () => {
        const intValue = 234;
        const intValueNode: IntValueNode = {
          kind: 'IntValue',
          value: intValue.toString(),
        };
        const valueNode: ListValueNode = {
          kind: 'ListValue',
          values: [intValueNode],
        };
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual([intValue]);
      });

      it('should return list with multiple elements', () => {
        const intValue = 2347;
        const intValueNode: IntValueNode = {
          kind: 'IntValue',
          value: intValue.toString(),
        };
        const nullFieldValueNode: NullValueNode = {
          kind: 'NullValue',
        };
        const objectValueNode = getObjectValueNode([['f', nullFieldValueNode]]);
        const valueNode: ListValueNode = {
          kind: 'ListValue',
          values: [intValueNode, objectValueNode],
        };
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual([intValue, { f: null }]);
      });
    });

    describe('NullValueNode', () => {
      it('should return null', () => {
        const valueNode: NullValueNode = {
          kind: 'NullValue',
        };
        const result = scalar.parseLiteral(valueNode);
        expect(result).toBeNull();
      });
    });

    describe('VariableNode', () => {
      it('should return undefined', () => {
        const name = 'variableName';
        const variableName: NameNode = {
          kind: 'Name',
          value: name,
        };
        const valueNode: VariableNode = {
          kind: 'Variable',
          name: variableName,
        };
        const result = scalar.parseLiteral(valueNode);
        expect(result).toBeUndefined();
      });
    });

    describe('EnumValueNode', () => {
      it('should return undefined', () => {
        const value = 'enumValue';
        const valueNode: EnumValueNode = {
          kind: 'EnumValue',
          value: value,
        };
        const result = scalar.parseLiteral(valueNode);
        expect(result).toBeUndefined();
      });
    });
  });
});
