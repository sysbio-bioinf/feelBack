import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { GetInstrumentsGQL } from '../../graphql/generated/feelback.graphql';
import * as Survey from 'survey-angular';
import { Screening } from '../../models/Screening';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'feelback-doctor-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuestionnaireComponent implements OnInit {
  constructor(
    private instrumentService: GetInstrumentsGQL,
    private route: ActivatedRoute,
  ) {
    const defaultThemeColors = Survey.StylesManager.ThemeColors.modern;
      defaultThemeColors['$main-color'] = '#00a3ff';
      defaultThemeColors['$main-hover-color'] = '#00a3ff';
      Survey.StylesManager.applyTheme('modern');
  }

  @Input() screening: Screening;
  public survey = new Survey.Model();

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      
      this.instrumentService.fetch().subscribe((data) => {
        this.survey = new Survey.Model(
          data.data.instruments.edges[0].node.payload,
        );
        this.survey.data = this.screening.result;
        // this.survey.currentPage = this.urlParameters.page;
        this.survey.mode = 'display';
        this.survey.showNavigationButtons = false;
        this.survey.showTitle = false;
        this.survey.locale = 'de';

        this.survey.onUpdateQuestionCssClasses.add(function (survey, options) {
          const classes = options.cssClasses;
          classes.mainRoot += ' sv-qstn';
          classes.root = 'sq-root';
          classes.title += ' sq-title';
          classes.label += ' sq-label';
        });
        Survey.SurveyNG.render('surveyContainer', { model: this.survey });
      });
    });
  }
}
