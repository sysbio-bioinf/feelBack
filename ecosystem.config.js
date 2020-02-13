module.exports = {
  apps: [
    {
      name: 'api-identity',
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
      user: 'feelback',
      host: '134.60.71.108',
      ref: 'origin/master',
      repo: 'johannesschobel@github.com:cancerlog.git',
      path: '/home/feelback/wwwroot/apps/feelback',
      //'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js'
    }
  }
};
