import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import * as Survey from 'survey-angular';
import { Screening } from '../../../models/Screening';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'feelback-doctor-screening-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuestionnaireComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.page = params['page'] ? params['page'] : 0;
    });
  }

  @Input() screening: Screening;
  @Input() payload: {};
  public page: number;
  public locale: string;
  public survey: Survey.Model;

  ngOnInit(): void {
    this.createSurveyWithDefaultValues();
    this.setSurveyTheme();
    this.setCustomCssClasses();
    this.renderSurvey();
  }

  public changeLocale(locale: string) {
    this.survey.locale = locale;
    this.renderSurvey();
  }

  public changePage($event) {
    this.survey.currentPageNo = $event.pageIndex;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: $event.pageIndex,
      },
      queryParamsHandling: 'merge',
    });
  }

  private async renderSurvey() {
    Survey.SurveyNG.render('surveyContainer', { model: this.survey });
  }

  private createSurveyWithDefaultValues() {
    this.survey = new Survey.Model(this.payload);
    this.survey.currentPageNo = this.page;
    this.survey.data = this.screening.result;
    this.survey.mode = 'display';
    this.survey.showNavigationButtons = false;
    this.survey.showTitle = false;
    this.survey.locale = this.screening.locale;
  }

  private setSurveyTheme() {
    const defaultThemeColors = Survey.StylesManager.ThemeColors.modern;
    defaultThemeColors['$main-color'] = this.commonService.colors.primary;
    defaultThemeColors['$main-hover-color'] = this.commonService.colors.primary;
    Survey.StylesManager.applyTheme('modern');
  }

  private setCustomCssClasses() {
    this.survey.onUpdateQuestionCssClasses.add(function (survey, options) {
      const classes = options.cssClasses;
      classes.mainRoot += ' sv-qstn';
      classes.root = 'sq-root';
      classes.title += ' sq-title';
      classes.label += ' sq-label';
    });
  }
}
