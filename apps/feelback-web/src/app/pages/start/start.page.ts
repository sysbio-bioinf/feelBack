import { Component, OnInit } from '@angular/core';
import { Feature } from '../../models/feature.model';

@Component({
  selector: 'feelback-web-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  features: Feature[] = [];

  constructor() {}

  ngOnInit(): void {
    this.features.push(
      {
        id: 'a',
        title: 'app.pages.start.features.features.a.title',
        headline: 'app.pages.start.features.features.a.title',
        lead: 'app.pages.start.features.features.a.title',
        text: 'app.pages.start.features.features.a.text',
      },
      {
        id: 'b',
        title: 'app.pages.start.features.features.b.title',
        headline: 'app.pages.start.features.features.b.title',
        lead: 'app.pages.start.features.features.b.title',
        text: 'app.pages.start.features.features.b.text',
      },
      {
        id: 'c',
        title: 'app.pages.start.features.features.c.title',
        headline: 'app.pages.start.features.features.c.title',
        lead: 'app.pages.start.features.features.c.title',
        text: 'app.pages.start.features.features.c.text',
      },
      {
        id: 'd',
        title: 'app.pages.start.features.features.d.title',
        headline: 'app.pages.start.features.features.d.title',
        lead: 'app.pages.start.features.features.d.title',
        text: 'app.pages.start.features.features.d.text',
      },
    );
  }
}
