import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

export class JSONObject {}

@Scalar('JSONObject', type => JSONObject)
export class JSONObjectScalar implements CustomScalar<object, object> {
  description =
    'The JSONObject scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).';

  parseValue(value: object): object {
    this.ensureObject(value);
    return value; // value sent by client
  }

  serialize(value: object): object {
    this.ensureObject(value);
    return value; // value sent to the client
  }

  parseLiteral(ast: ValueNode): object {
    const value = new Object(null);
    if (ast.kind === Kind.OBJECT) {
      ast.fields.forEach(field => {
        value[field.name.value] = this.parseObject(field.value);
      });
    }
    return value;
  }

  parseObject(ast) {
    switch (ast.kind) {
      case Kind.STRING:
      case Kind.BOOLEAN:
        return ast.value;
      case Kind.INT:
      case Kind.FLOAT:
        return parseFloat(ast.value);
      case Kind.OBJECT:
        return this.parseLiteral(ast);
      case Kind.LIST:
        return ast.values.map(n => this.parseObject(n));
      case Kind.NULL:
        return null;
      case Kind.VARIABLE:
        // DISCUSS: How can we get the variables?
        return undefined;
      default:
        return undefined;
    }
  }

  ensureObject(value) {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw new TypeError(
        `JSONObject cannot represent non-object value: ${value}`
      );
    }
  }
}
