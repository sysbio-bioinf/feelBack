import { Component } from '@angular/core';

import { SurveyBaseComponent } from '@cancerlog/features';

@Component({
  selector: 'cancerlog-survey',
  templateUrl: 'survey.component.html',
})
export class SurveyComponent extends SurveyBaseComponent {
  constructor() {
    super();
  }
}
