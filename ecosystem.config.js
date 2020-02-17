module.exports = {
  apps: [
    {
      name: 'feelback-identity',
      script: 'dist/apps/feelback-identity/main.js',

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      // args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'

      // env: {
      //   NODE_ENV: 'development'
      // },
      // env_production: {
      //   NODE_ENV: 'production'
      // }
    }
  ],

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
        'cp ./../.env ./.env && docker-compose -f identity.docker-compose.yml build app_identity&& docker-compose -f identity.docker-compose.yml up -d'
    }
  }
};
