# Taona Cosmetics #

## Description ##

Taona is an e-commerce website which sells boxes and accessories for Black Hair

## Installation ##

Clone the repo and follow the instructions for the backend and the frontend 

### Here are the dependancies you need to install for the backend:

run `npm install` to install the dependancies.

- NodeJS 12.14 or 14.0
- Express
- jsonwebtoken
- async-waterfall
- MySQL
- MySQL2
- Sequelize
- Sequelize-CLI
- DotEnv : 
`
DB_TOKEN= ;
DB_EXPIRES_IN= ;
`
- Stripe

On Windows, these installations require to use PowerShell in administrator mode.


### For the database create a folder `config` with a file named `config.json` with custom information:
`{
  "development": {
    "username": "",
    "password": "",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "",
    "password": "",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "",
    "password": "",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
`
### Create a file database.js with custom information :
`
var mysql = require('mysql');

var conn = mysql.createConnection({
  host: 'localhost', 
  user: '', 
  password: "",
  database: 'database_development' 
}); 
conn.connect(function(err) { 
if (err) throw err;
console.log('Database is connected successfully !'); 
}); 
module.exports = conn;
`
### Here are the dependancies you need to install for the frontend:

run `npm install` to install the dependancies.

- VueJS 3
- Vue-CLI
- Bootstrap
- Axios
- Vuex
- Vue-router


## Usage ##

### Backend

For the backend run `npm start`. This should run the local server.

The server should run on `localhost` with default port `3000`. 

If the server runs on another port for any reason, this is printed to the console when the server starts, e.g. `Listening on port 3001`.

### Frontend

For the frontend run 'npm run serve'. This should run the frontend.

The server should run on `localhost` with default port `8080`. 

