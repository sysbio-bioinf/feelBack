module.exports = {
  apps: [],

  deploy: {
    production: {
      key: '~/.ssh/id_rsa',
      user: 'feelback',
      host: ['134.60.71.108'],
      ssh_options: 'ForwardAgent=yes',
      ref: 'origin/build/docker-01',
      repo: 'git@github.com:johannesschobel/cancerlog.git',
      path: '/home/feelback/wwwroot/apps/feelback-app',
      'post-deploy':
        'cp ./../../.env2 ./.env \
        && npm run docker:prod:build \
        && npm run docker:prod:serve',
    },
  },
};
