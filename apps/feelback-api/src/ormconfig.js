require('dotenv').config({ path: './../../../.env' });

// TODO We need to properly sync this file with the CONFIGURATION of the database
module.exports = {
  type: process.env.FB_DB_TYPE,
  host: process.env.FB_DB_HOST,
  port: process.env.FB_DB_PORT,
  username: process.env.FB_DB_USER,
  password: process.env.FB_DB_PASSWORD,
  database: process.env.FB_DB_NAME,
  migrationsTableName: 'migrations',
  migrations: ['database/migrations/generated/*.js'],
  cli: {
    migrationsDir: 'database/migrations/src',
  },
  synchronize: false,
};
