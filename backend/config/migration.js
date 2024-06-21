const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname+'/env/'+process.env.ENVIRONMENT+'.env')});

module.exports = {
  dev: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    migrationStorageTableName: 'migrations',
    seederStorageTableName: 'migrations'
    
  },
  local: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    migrationStorageTableName: 'migrations',
    seederStorageTableName: 'migrations'
    
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    migrationStorageTableName: 'migrations',
    seederStorageTableName: 'migrations'
    
  }
};