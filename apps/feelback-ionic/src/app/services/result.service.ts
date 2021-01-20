import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(private translateService: TranslateService) {}

  generateResultText(plainData: any[], instrumentName: string) {
    let resultText = '';
    const birthdate = this.translateService.instant(
      'app.components.htmlResult.birthdate',
    );
    const idTranslated = this.translateService.instant(
      'app.components.htmlResult.id',
    );
    const questionTranslated = this.translateService.instant(
      'app.components.htmlResult.question',
    );
    const answerTranslated = this.translateService.instant(
      'app.components.htmlResult.answer',
    );

    resultText += '<div style="font-size: 12px">';

    resultText += `<h1>${instrumentName}</h1>`;
    resultText += `<p>${new Date().toLocaleString(
      this.translateService.currentLang,
    )}</p>`;

    resultText += `<p>Name: _____________________________</p>`;
    resultText += `<p>${birthdate}: _____________________</p>`;

    resultText += '<table style="width: 100%; font-size: 1em">';
    resultText += `<tr>
      <th style="width: 10%; vertical-align: top; border-bottom: 1px solid #7e8c8d;">${idTranslated}</th>
      <th style="width: 40%; vertical-align: top; border-bottom: 1px solid #7e8c8d;">${questionTranslated}</th>
      <th style="width: 50%; vertical-align: top; border-bottom: 1px solid #7e8c8d;">${answerTranslated}</th>
    </tr>`;

    let id = 0;

    for (const q of plainData) {
      if (q.name.startsWith('__')) {
        // we skip elements starting with "__" for our html export and print view
        continue;
      }

      const question = q.title;
      let value = q.displayValue;
      if (value === '' || value === null || value === undefined) {
        value = '---';
      }

      id++;
      resultText += `<tr>
          <td style="width: 10%; vertical-align: top; border-bottom: 1px solid #7e8c8d;">${id}<td>
          <td style="width: 40%; vertical-align: top; border-bottom: 1px solid #7e8c8d;">${question}<td>
          <td style="width: 50%; vertical-align: top; border-bottom: 1px solid #7e8c8d;">${value}<td>
        </tr>`;
    }

    resultText += '</table>';
    resultText += '</div>';

    return resultText;
  }
}
