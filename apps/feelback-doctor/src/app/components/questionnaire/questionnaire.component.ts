import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { GetInstrumentsGQL } from '../../graphql/generated/feelback.graphql';
import * as Survey from 'survey-angular';
import { Screening } from '../../models/Screening';

@Component({
  selector: 'feelback-doctor-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionnaireComponent implements OnInit {

  constructor(private instrumentService: GetInstrumentsGQL) { 
      const defaultThemeColors = Survey.StylesManager.ThemeColors.modern;
    defaultThemeColors['$main-color'] = '#00a3ff';
    defaultThemeColors['$main-hover-color'] = '#00a3ff';
    Survey.StylesManager.applyTheme("modern");

    this.loading = true;
    this.instrumentService.fetch().subscribe(data => {
      this.instrument = data.data.instruments.edges[0].node.payload;

      this.survey = new Survey.Model(this.instrument);
      this.survey.data = this.screening.result;
      // this.survey.currentPage = this.urlParameters.page;
      this.survey.mode = "display";
      this.survey.showNavigationButtons = false;
      this.survey.showTitle = false;
      this.survey.locale = 'de';

      this.survey.onUpdateQuestionCssClasses.add(function (survey, options) {
        const classes = options.cssClasses;
        classes.mainRoot += " sv_qstn";
        classes.root = "sq-root";
        classes.title += " sq-title";
        classes.label += " sq-label";
        classes.navigationButton += " btn btn-primary";
      });

      this.loading = false;

      Survey.SurveyNG.render('surveyContainer', { model: this.survey });
    });
  }

  @Input() screening: Screening;
  public instrument;
  public survey = new Survey.Model();
  public loading;

  ngOnInit(): void {
  }

  public nextPage() {
    this.survey.nextPage();
  }

  public prevPage() {
    this.survey.prevPage();
  }

}
