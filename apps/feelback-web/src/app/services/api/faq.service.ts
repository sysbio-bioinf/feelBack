import { Injectable } from '@angular/core';
import {
  GetFaqsGQL,
  CursorPaging,
} from '../../graphql/generated/feelback.graphql';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(readonly getFaqsService: GetFaqsGQL) {}

  async getFaqs(paging: CursorPaging = {}) {
    const faqResult = await this.getFaqsService
      .fetch({ pagination: paging })
      .toPromise();
    return faqResult.data.faqs;
  }
}
