import { Injectable } from '@angular/core';
import {
  GetFaqByIdGQL,
  GetFaqsGQL,
} from '../../graphql/generated/feelback.graphql';
import { Faq } from '../../models/faq.model';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private gqlFaqs: GetFaqsGQL, private getFaqById: GetFaqByIdGQL) {}

  async getAll(): Promise<Faq[]> {
    const faqResponse = await this.gqlFaqs.fetch().toPromise();
    if (faqResponse.errors) {
      throw new Error('Es ist ein Fehler aufgetreten');
    }

    const faqs = faqResponse.data.faqs.edges.map((item) => {
      return {
        id: item.node.id,
        question: item.node.question,
        answer: item.node.answer,
        isActive: item.node.isActive,
      } as Faq;
    });

    return faqs;
  }

  async getById(id: string): Promise<Faq> {
    const faqResponse = await this.getFaqById.fetch({ id }).toPromise();
    if (faqResponse.errors) {
      throw new Error('Es ist ein Fehler aufgetreten');
    }

    const faqData = faqResponse.data.faq;
    if (!faqData) {
      throw new Error('Es ist ein Fehler aufgetreten');
    }

    return {
      id: faqData.id,
      question: faqData.question,
      answer: faqData.answer,
      isActive: faqData.isActive,
    };
  }
}
