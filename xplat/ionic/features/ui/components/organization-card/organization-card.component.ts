import { Component, Input } from '@angular/core';
import { OrganizationCardBaseComponent } from '@cancerlog/features';
import { ShortenPipe, StripTagsPipe } from 'ngx-pipes';
import { Organization } from '@cancerlog/core/models/mobile';

@Component({
  selector: 'cancerlog-organization-card',
  templateUrl: 'organization-card.component.html',
  providers: [StripTagsPipe, ShortenPipe],
})
export class OrganizationCardComponent extends OrganizationCardBaseComponent {
  @Input() organization: Organization;

  constructor(
    readonly shortenPipe: ShortenPipe,
    readonly stripTags: StripTagsPipe,
  ) {
    super();
  }
}
