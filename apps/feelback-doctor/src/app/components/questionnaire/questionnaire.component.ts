import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ViewChild,
} from '@angular/core';
import { GetInstrumentsGQL } from '../../graphql/generated/feelback.graphql';
import * as Survey from 'survey-angular';
import { Screening } from '../../models/Screening';
import { ActivatedRoute, Router } from '@angular/router';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
    private router: Router,
  ) {}

  @Input() screening: Screening;
  public survey = new Survey.Model();

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.instrumentService.fetch().subscribe((data) => {
        this.survey = new Survey.Model(
          data.data.instruments.edges[0].node.payload,
        );
        this.survey.data = this.screening.result;
        this.survey.currentPageNo = params['page'] ? params['page'] : 0;
        this.survey.mode = 'display';
        this.survey.showNavigationButtons = false;
        this.survey.showTitle = false;
        this.survey.locale = 'de';

        this.setSurveyTheme();
        this.setCustomCssClasses();
        this.renderSurvey();
      });
    });
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

  public closeScreening() {
    this.router.navigate([]);
  }

  private async renderSurvey() {
    Survey.SurveyNG.render('surveyContainer', { model: this.survey });
  }

  private setSurveyTheme() {
    const defaultThemeColors = Survey.StylesManager.ThemeColors.modern;
    defaultThemeColors['$main-color'] = '#00a3ff';
    defaultThemeColors['$main-hover-color'] = '#00a3ff';
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
