

const pg = require('pg');

const {dbUrl} = require("./configs");
const dbconection = new pg.Client(dbUrl);

module.exports = dbconection;



// const pg = require("pg");
// const {DB_URL} = require("./configs");

// const client = new pg.Client(DB_URL);

// module.exports = client;