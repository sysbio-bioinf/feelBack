import { Component, OnInit, Input } from '@angular/core';
import { Organization } from 'src/app/models/organization.model';
import { AbstractComponent } from 'src/app/core/components/abstract.component';
import { ShortenPipe, StripTagsPipe } from 'ngx-pipes';

@Component({
  selector: 'feelback-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.scss'],
  providers: [StripTagsPipe, ShortenPipe],
})
export class OrganizationCardComponent extends AbstractComponent {
  @Input() organization: Organization;

  constructor(
    readonly shortenPipe: ShortenPipe,
    readonly stripTags: StripTagsPipe,
  ) {
    super();
  }
}
