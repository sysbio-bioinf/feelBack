import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import * as Survey from 'survey-angular';
import * as widgets from 'surveyjs-widgets';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { Screening } from '../../../graphql/generated/feelback.graphql';
import { PageEvent } from '@angular/material/paginator';

widgets.nouislider(Survey);

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
    public commonService: CommonService,
  ) {
    this.setSurveyTheme();
    this.route.queryParams.subscribe((params) => {
      this.page = params['page'] ? params['page'] : 0;
    });
  }

  @Input() screening: Screening;
  @Input() payload: {};
  public page: number;
  public locale: string;
  public survey: Survey.Model;

  async ngOnInit(): Promise<void> {
    this.createSurveyWithDefaultValues();
    this.renderSurvey();
  }

  public print() {
    this.survey.isSinglePage = true;
    this.renderSurvey().then(() => {
      window.print();
      this.survey.isSinglePage = false;
      this.renderSurvey();
    });
  }

  public changeLocale(locale: string) {
    this.survey.locale = locale;
    this.renderSurvey();
  }

  public changePage($event: PageEvent) {
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
    Survey.SurveyNG.render('surveyElement', { model: this.survey });
  }

  private createSurveyWithDefaultValues() {
    this.survey = new Survey.Model(this.payload);
    this.survey.currentPageNo = this.page;
    this.survey.data = this.screening.payload;
    this.survey.mode = 'display';
    this.survey.showNavigationButtons = false;
    this.survey.showTitle = false;
    this.survey.locale = this.screening.language;
  }

  private setSurveyTheme() {
    const defaultThemeColors = Survey.StylesManager.ThemeColors.modern;
    defaultThemeColors['$main-color'] = this.commonService.colors.primary;
    defaultThemeColors['$main-hover-color'] = this.commonService.colors.primary;
    Survey.StylesManager.applyTheme('modern');
  }
}
