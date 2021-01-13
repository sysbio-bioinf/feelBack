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

const stringValue = 'stringValueNode';
const stringValueNode: StringValueNode = {
  kind: 'StringValue',
  value: stringValue,
};
const booleanValue = true;
const booleanValueNode: BooleanValueNode = {
  kind: 'BooleanValue',
  value: booleanValue,
};
const intValue = 123;
const intValueNode: IntValueNode = {
  kind: 'IntValue',
  value: intValue.toString(),
};
const floatValue = 123.75;
const floatValueNode: FloatValueNode = {
  kind: 'FloatValue',
  value: floatValue.toString(),
};
const nullValueNode: NullValueNode = {
  kind: 'NullValue',
};
const listValueNode: ListValueNode = {
  kind: 'ListValue',
  values: [],
};
const name = 'variableName';
const variableName: NameNode = {
  kind: 'Name',
  value: name,
};
const variableValueNode: VariableNode = {
  kind: 'Variable',
  name: variableName,
};
const enumValue = 'enumValue';
const enumValueNode: EnumValueNode = {
  kind: 'EnumValue',
  value: enumValue,
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
      const strValue = 'string!';
      expect(scalar.parseValue(strValue)).toStrictEqual(strValue);
      const numberValue = 1234;
      expect(scalar.parseValue(numberValue)).toStrictEqual(numberValue);
    });
  });

  describe('serialize', () => {
    it('should return value', () => {
      const strValue = 'string!';
      expect(scalar.serialize(strValue)).toStrictEqual(strValue);
      const numberValue = 1234;
      expect(scalar.serialize(numberValue)).toStrictEqual(numberValue);
    });
  });

  describe('parseLiteral', () => {
    describe('StringValueNode', () => {
      it('should return string value', () => {
        const result = scalar.parseLiteral(stringValueNode);
        expect(result).toStrictEqual(stringValue);
      });
    });

    describe('BooleanValueNode', () => {
      it('should return boolean value', () => {
        const result = scalar.parseLiteral(booleanValueNode);
        expect(result).toStrictEqual(booleanValue);
      });
    });

    describe('IntValueNode', () => {
      it('should return int value', () => {
        const result = scalar.parseLiteral(intValueNode);
        expect(result).toStrictEqual(intValue);
      });

      it('should return NaN if int value is not a number', () => {
        const valueNode: IntValueNode = {
          kind: 'IntValue',
          value: 'invalid',
        };
        const result = scalar.parseLiteral(valueNode);
        expect(result).toBeNaN();
      });
    });

    describe('FloatValueNode', () => {
      it('should return float value', () => {
        const result = scalar.parseLiteral(floatValueNode);
        expect(result).toStrictEqual(floatValue);
      });

      it('should return NaN if float value is not a number', () => {
        const valueNode: FloatValueNode = {
          kind: 'FloatValue',
          value: 'invalid',
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
        const fieldValueNodeB = getObjectValueNode([]);
        const valueNode = getObjectValueNode([
          ['a', nullValueNode],
          ['b', fieldValueNodeB],
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
      it('should return empty list if no values are contained', () => {
        const result = scalar.parseLiteral(listValueNode);
        expect(result).toStrictEqual([]);
      });

      it('should return list with 1 element', () => {
        const valueNode: ListValueNode = {
          kind: 'ListValue',
          values: [intValueNode],
        };
        const result = scalar.parseLiteral(valueNode);
        expect(result).toStrictEqual([intValue]);
      });

      it('should return list with multiple elements', () => {
        const objectValueNode = getObjectValueNode([['f', nullValueNode]]);
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
        const result = scalar.parseLiteral(nullValueNode);
        expect(result).toBeNull();
      });
    });

    describe('VariableNode', () => {
      it('should return undefined', () => {
        const result = scalar.parseLiteral(variableValueNode);
        expect(result).toBeUndefined();
      });
    });

    describe('EnumValueNode', () => {
      it('should return undefined', () => {
        const result = scalar.parseLiteral(enumValueNode);
        expect(result).toBeUndefined();
      });
    });
  });
});
