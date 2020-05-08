import { Component, OnInit } from '@angular/core';
import { Feature } from '../../models/feature.model';
import { FaqService } from '../../services/api/faq.service';
import { CursorPaging } from '../../graphql/generated/feelback.graphql';
import { Faq } from '../../models/faq.model';

@Component({
  selector: 'feelback-web-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  features: Feature[] = [];
  faqs: Faq[] = [];

  constructor(readonly faqService: FaqService) {}

  ngOnInit(): void {
    this.features.push(
      {
        id: 'a',
        title: 'app.pages.start.features.features.a.title',
        headline: 'app.pages.start.features.features.a.title',
        lead: 'app.pages.start.features.features.a.title',
        text: 'app.pages.start.features.features.a.text',
        image: 'passport',
      },
      {
        id: 'b',
        title: 'app.pages.start.features.features.b.title',
        headline: 'app.pages.start.features.features.b.title',
        lead: 'app.pages.start.features.features.b.title',
        text: 'app.pages.start.features.features.b.text',
        image: 'user',
      },
      {
        id: 'c',
        title: 'app.pages.start.features.features.c.title',
        headline: 'app.pages.start.features.features.c.title',
        lead: 'app.pages.start.features.features.c.title',
        text: 'app.pages.start.features.features.c.text',
        image: 'smiley',
      },
      {
        id: 'd',
        title: 'app.pages.start.features.features.d.title',
        headline: 'app.pages.start.features.features.d.title',
        lead: 'app.pages.start.features.features.d.title',
        text: 'app.pages.start.features.features.d.text',
        image: 'file',
      },
    );

    this.loadFaqs({ first: 10 });
  }

  loadFaqs(paging: CursorPaging = {}) {
    this.faqService.getFaqs(paging).then((result) => {
      const nodes = result.edges.map((entry) => {
        return {
          id: entry.node.id,
          question: entry.node.question,
          answer: entry.node.answer,
        } as Faq;
      });
      this.faqs.push(...nodes);

      if (result.pageInfo.hasNextPage === true) {
        this.loadFaqs({ after: result.pageInfo.endCursor, first: 10 });
      }
    });
  }
}
