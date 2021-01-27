import { Injectable } from '@angular/core';
import {
  GetIdentityByPseudonymGQL,
  Identity,
} from '../../graphql/generated/feelback.graphql';
import { TranslatableError } from '../../core/customErrors/translatableError';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(
    private getIdentityByPseudonymService: GetIdentityByPseudonymGQL,
  ) {}

  async getIdentityByPseudonym(
    pseudonym: string,
  ): Promise<Partial<Identity>> | null {
    try {
      const response = await this.getIdentityByPseudonymService
        .fetch({ pseudonym: pseudonym })
        .toPromise();
      return response.data.identityByPseudonym;
    } catch (error) {
      // pseudonym was not found
      console.error(error);
      throw new TranslatableError('app.errors.services.identity.notFound');
    }
  }
}
