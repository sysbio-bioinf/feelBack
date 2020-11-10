import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(private translateService: TranslateService) {}

  generateResultText(plainData: any[], instrumentName: string) {
    let resultText = '';

    resultText = resultText + '<div style="font-size: 12px">';

    resultText = resultText + '<h1>' + instrumentName + '</h1>';
    resultText =
      resultText +
      `<p>${new Date().toLocaleString(this.translateService.currentLang)}</p>`;

    resultText = resultText + `<p>Name: _____________________________</p>`;
    resultText = resultText + `<p>Geburtsdatum: _____________________</p>`;

    resultText = resultText + '<table style="width: 100%; font-size: 1em">';

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
      resultText =
        resultText +
        `<tr>
          <td style="width: 10%; vertical-align: top; border-bottom: 1px solid #7e8c8d;">${id}<td>
          <td style="width: 40%; vertical-align: top; border-bottom: 1px solid #7e8c8d;">${question}<td>
          <td style="width: 50%; vertical-align: top; border-bottom: 1px solid #7e8c8d;">${value}<td>
        </tr>`;
    }

    resultText = resultText + '</table>';
    resultText = resultText + '</div>';

    return resultText;
  }
}
