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
export const getObjectValueNode = (
  fields: [string, ValueNode][],
): ObjectValueNode => {
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

export const stringValue = 'stringValueNode';
export const stringValueNode: StringValueNode = {
  kind: 'StringValue',
  value: stringValue,
};
export const booleanValue = true;
export const booleanValueNode: BooleanValueNode = {
  kind: 'BooleanValue',
  value: booleanValue,
};
export const intValue = 123;
export const intValueNode: IntValueNode = {
  kind: 'IntValue',
  value: intValue.toString(),
};
export const floatValue = 123.75;
export const floatValueNode: FloatValueNode = {
  kind: 'FloatValue',
  value: floatValue.toString(),
};
export const nullValueNode: NullValueNode = {
  kind: 'NullValue',
};
export const listValueNode: ListValueNode = {
  kind: 'ListValue',
  values: [],
};
export const name = 'variableName';
export const variableName: NameNode = {
  kind: 'Name',
  value: name,
};
export const variableValueNode: VariableNode = {
  kind: 'Variable',
  name: variableName,
};
export const enumValue = 'enumValue';
export const enumValueNode: EnumValueNode = {
  kind: 'EnumValue',
  value: enumValue,
};
