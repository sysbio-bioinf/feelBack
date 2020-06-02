import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from 'src/app/core/components/abstract.component';
import { Router } from '@angular/router';
import { TutorialSlideModel } from 'src/app/models/tutorial-slide.model';

@Component({
  selector: 'feelback-ionic-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage extends AbstractComponent {
  showSkip = true;

  // TODO Extract to I18N file
  tutorialSlides: TutorialSlideModel[] = [
    {
      image: 'assets/images/tutorial/tutorial-01.png',
      title: 'Willkommen bei <b>FeelBack</b>',
      text:
        '<b>FeelBack</b> soll helfen, Tumorpatientinnen und -patienten eine bedarfsgerechte psychoonkologische Versorgung zu ermöglichen.',
    },
    {
      image: 'assets/images/tutorial/tutorial-02.png',
      title: 'Was macht <b>FeelBack</b>?',
      text:
        'Bei <b>FeelBack</b> werden die Screeningdaten digital erfasst und in Form eines standardisierten Datensatzes sicher an eine zentrale Datenbank übertragen.',
    },
    {
      image: 'assets/images/tutorial/tutorial-03.png',
      title: 'Was ist das Ziel von <b>FeelBack</b>?',
      text:
        '<b>FeelBack</b> ermöglicht die Identifikation psychosozial belasteter Patientinnen und Patienten, ebenso wie die Dokumentation des Screenings und des Therapieverlaufs.',
    },
    {
      image: 'assets/images/tutorial/tutorial-04.png',
      title: 'Los Gehts!',
      text: 'FeelBack starten',
    },
  ];

  constructor(private router: Router) {
    super();
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then((isEnd) => {
      this.showSkip = !isEnd;
    });
  }

  async navigateToStart() {
    await this.router.navigate(['start'], { replaceUrl: true });
  }
}
