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
        && docker-compose -f identity.docker-compose.yml up -d \
        && docker-compose -f api.docker-compose.yml up -d',
    },
  },
};
