import { Injectable } from '@angular/core';
import {
  GetFaqByIdGQL,
  GetFaqsGQL,
} from '../../graphql/generated/feelback.graphql';
import { Faq } from '../../models/faq.model';
import { TranslatableError } from '../../core/customErrors/translatableError';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private gqlFaqs: GetFaqsGQL, private getFaqById: GetFaqByIdGQL) {}

  async getAll(): Promise<Faq[]> {
    let faqResponse;
    try {
      faqResponse = await this.gqlFaqs.fetch().toPromise();
    } catch (err) {
      console.error(err);
      throw new TranslatableError('app.errors.services.faq.all');
    }

    if (faqResponse.errors) {
      throw new TranslatableError('app.errors.services.faq.allResponse');
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
    let faqResponse;
    try {
      faqResponse = await this.getFaqById.fetch({ id }).toPromise();
    } catch (err) {
      console.error(err);
      throw new TranslatableError('app.errors.services.faq.id');
    }
    if (faqResponse.errors) {
      throw new TranslatableError('app.errors.services.faq.idResponse');
    }

    const faqData = faqResponse.data.faq;
    if (!faqData) {
      throw new TranslatableError('app.errors.services.faq.none');
    }

    return {
      id: faqData.id,
      question: faqData.question,
      answer: faqData.answer,
      isActive: faqData.isActive,
    };
  }
}
