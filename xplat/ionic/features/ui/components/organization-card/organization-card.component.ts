import { Component, Input } from '@angular/core';
import { OrganizationCardBaseComponent } from '@cancerlog/features';
import { ShortenPipe, StripTagsPipe } from 'ngx-pipes';
import { Organization } from '@cancerlog/core/models/mobile/organization.model';

@Component({
  selector: 'cancerlog-organization-card',
  templateUrl: 'organization-card.component.html',
  providers: [StripTagsPipe, ShortenPipe],
})
export class OrganizationCardComponent extends OrganizationCardBaseComponent {
  constructor(
    readonly shortenPipe: ShortenPipe,
    readonly stripTags: StripTagsPipe,
  ) {
    super();
  }
}
