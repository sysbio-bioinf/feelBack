import { IdentityEntity } from '../../app/modules/identity/data/entities/identity.entity';
import { StringHelper } from '@cancerlog/util/core';
import { getConnection } from 'typeorm';

export async function seed() {
  const connection = getConnection();

  const identity1 = new IdentityEntity();
  identity1.id = StringHelper.uuid4();
  identity1.pseudonym = 'pseudo1';

  const identity2 = new IdentityEntity();
  identity2.id = StringHelper.uuid4();
  identity2.pseudonym = 'pseudo2';

  const repository = connection.getRepository(IdentityEntity);
  await repository.save([identity1, identity2]);
}
