import { Injectable } from '@angular/core';
import {
  GetIdentityByPseudonymGQL,
  Identity,
} from '../../graphql/generated/feelback.graphql';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(
    private getIdentityByPseudonymService: GetIdentityByPseudonymGQL,
  ) {}

  async getIdentityByPseudonym(pseudonym: string): Promise<Partial<Identity>> {
    const response = await this.getIdentityByPseudonymService
      .fetch({ pseudonym: pseudonym })
      .toPromise();

    return response.data.identityByPseudonym;
  }
}
