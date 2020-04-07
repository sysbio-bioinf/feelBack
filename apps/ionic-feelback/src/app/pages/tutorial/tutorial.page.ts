import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SlideModel } from '@cancerlog/core/models/mobile/slide.model';

@Component({
  selector: 'page-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
  showSkip = true;

  tutorialSlides: SlideModel[] = [
    {
      image: 'assets/imgs/tutorial/tutorial-01.png',
      title: 'Willkommen bei <b>FeelBack</b>',
      text:
        '<b>FeelBack</b> soll helfen, Tumorpatientinnen und -patienten eine bedarfsgerechte psychoonkologische Versorgung zu ermöglichen.',
    },
    {
      image: 'assets/imgs/tutorial/tutorial-02.png',
      title: 'Was macht <b>FeelBack</b>?',
      text:
        'Bei <b>FeelBack</b> werden die Screeningdaten digital erfasst und in Form eines standardisierten Datensatzes sicher an eine zentrale Datenbank übertragen.',
    },
    {
      image: 'assets/imgs/tutorial/tutorial-03.png',
      title: 'Was ist das Ziel von <b>FeelBack</b>?',
      text:
        '<b>FeelBack</b> ermöglicht die Identifikation psychosozial belasteter Patientinnen und Patienten, ebenso wie die Dokumentation des Screenings und des Therapieverlaufs.',
    },
    {
      image: 'assets/imgs/tutorial/tutorial-04.png',
      title: 'Los Gehts!',
      text: 'FeelBack starten',
    },
  ];

  constructor(private navController: NavController) {}

  ngOnInit() {}

  onSlideChangeStart(event) {
    event.target.isEnd().then((isEnd) => {
      this.showSkip = !isEnd;
    });
  }

  async navigateBack() {
    await this.navController.navigateRoot(['/']);
  }
}
