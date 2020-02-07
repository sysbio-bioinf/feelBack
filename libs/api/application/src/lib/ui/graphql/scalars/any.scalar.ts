import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

export class Anything {}

@Scalar('Anything', type => Anything)
export class AnythingScalar implements CustomScalar<any, any> {
  description =
    'The Anything scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).';

  parseValue(value: any): any {
    return value; // value sent by client
  }

  serialize(value: any): any {
    return value; // value sent to the client
  }

  parseLiteral(ast: ValueNode): any {
    switch (ast.kind) {
      case Kind.STRING:
      case Kind.BOOLEAN:
        return ast.value;
      case Kind.INT:
      case Kind.FLOAT:
        return parseFloat(ast.value);
      case Kind.OBJECT:
        const value = new Object(null);
        ast.fields.forEach(field => {
          value[field.name.value] = this.parseLiteral(field.value);
        });
        return value;
      case Kind.LIST:
        return ast.values.map(n => this.parseLiteral(n));
      case Kind.NULL:
        return null;
      case Kind.VARIABLE:
        // DISCUSS: How can we get the variables?
        return undefined;
      default:
        return undefined;
    }
  }
}
