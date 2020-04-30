module.exports = {
  apps: [],

  deploy: {
    production: {
      key: '~/.ssh/id_rsa',
      user: 'feelback',
      host: ['134.60.71.108'],
      ssh_options: 'ForwardAgent=yes',
      ref: 'origin/master',
      repo: 'git@github.com:johannesschobel/cancerlog.git',
      path: '/home/feelback/wwwroot/apps/feelback',
      'post-deploy':
        'cp ./../../.env ./.env \
        && npm run docker:build:core \
        && npm run docker:build:deps \
        && npm run docker:build:api \
        && docker-compose -f prod.docker-compose.yml up -d',
    },

    prod: {
      key: '~/.ssh/id_rsa',
      user: 'feelback',
      host: ['134.60.71.108'],
      ssh_options: 'ForwardAgent=yes',
      ref: 'origin/master',
      repo: 'git@github.com:johannesschobel/cancerlog.git',
      path: '/home/feelback/wwwroot/apps/feelback-app',
      'post-deploy':
        'cp ./../../.env2 ./.env \
        && npm run docker:prod:build \
        && npm run docker:prod:serve',
    },
  },
};
