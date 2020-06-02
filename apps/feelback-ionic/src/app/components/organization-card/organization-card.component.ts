import { Component, Input } from '@angular/core';
import { AbstractComponent } from 'src/app/core/components/abstract.component';
import { Organization } from 'src/app/models/organization.model';

@Component({
  selector: 'feelback-ionic-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.scss'],
})
export class OrganizationCardComponent extends AbstractComponent {
  @Input() organization: Organization;

  constructor() {
    super();
  }
}
