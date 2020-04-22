import { Component, OnInit } from '@angular/core';
import { GetOrganizationByIdGQL } from './graphql/generated/feelback.graphql';

@Component({
  selector: 'feelback-web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'feelback-web';

  year = new Date().getFullYear();

  constructor(readonly getOrganizationService: GetOrganizationByIdGQL) {}

  async ngOnInit() {
    console.log('hallo');

    const asdf = await this.getOrganizationService
      .fetch({ id: '61c0362c-33cd-4a32-b4cd-a435040fda84' })
      .toPromise();

    console.log(JSON.stringify(asdf.data.organization));
  }
}
