export const environment = {
  production: true,

  connections: {
    feelback: 'https://api.feelback-app.com/graphql',
  },
  idleConfig: {
    idleTime: 60 * 5,
    timeout: 60 * 1,
  },
  languages: {
    availableLanguages: ['en', 'de'],
  },
};
