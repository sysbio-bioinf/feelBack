import { KeycloakService } from 'keycloak-angular';
import { environment } from './environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: environment.connections.keycloak,
            realm: 'feelback',
            clientId: 'feelback-api-client',
          },
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false,
          },
          enableBearerInterceptor: true,
          bearerExcludedUrls: [],
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}