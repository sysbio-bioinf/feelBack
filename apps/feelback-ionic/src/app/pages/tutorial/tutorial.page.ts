import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../../core/components/abstract.component';
import { Router } from '@angular/router';
import { TutorialSlideModel } from '../../models/tutorial-slide.model';

@Component({
  selector: 'feelback-ionic-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage extends AbstractComponent {
  numberOfSlides = 4;
  slideNumberArray = Array.from(Array(this.numberOfSlides), (_, i) => i + 1);

  constructor(private router: Router) {
    super();
  }

  async navigateToStart() {
    await this.router.navigate(['/start'], { replaceUrl: true });
  }
}
