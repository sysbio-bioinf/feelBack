import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DefaultOptions } from 'apollo-client';
import { environment } from './../../environments/environment';

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [],
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const apiUri = environment.connections.feelback;

    const defaultOptions: DefaultOptions = {
      query: {
        fetchPolicy: 'network-only',
      },
      watchQuery: {
        fetchPolicy: 'network-only',
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    };

    apollo.createDefault({
      link: httpLink.create({ uri: apiUri }),
      cache: new InMemoryCache({ resultCaching: false }),
      defaultOptions,
    });
  }
}
