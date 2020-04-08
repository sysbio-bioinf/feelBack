import { Input } from '@angular/core';
import { BaseComponent } from '@cancerlog/core';
import { Organization } from '@cancerlog/core/models/mobile/organization.model';

export abstract class OrganizationCardBaseComponent extends BaseComponent {
  @Input() organization: Organization;

  constructor() {
    super();
  }
}
