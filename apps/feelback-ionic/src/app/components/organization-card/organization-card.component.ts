import { Component, Input } from '@angular/core';
import { AbstractComponent } from '../../core/components/abstract.component';
import { Organization } from '../../models/organization.model';

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
