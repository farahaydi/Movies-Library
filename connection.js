
const pg = require('pg');
const { dbUrl } = require('./configs');

const dbConnection = new pg.Client({
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false, // Set this to false to bypass SSL/TLS verification (useful for development, not recommended for production)
  },
});
module.exports = dbConnection;

// const pg = require('pg');

// const {dbUrl} = require("./configs");
// const dbconection = new pg.Client(dbUrl);

// module.exports = dbconection;

// const pg = require('pg');

// const { dbUrl } = require("./configs");

// const dbConnection = new pg.Client({
//   connectionString: dbUrl,
//   ssl: {
//     rejectUnauthorized: false, // Set this to false to bypass SSL/TLS verification (useful for development, not recommended for production)
//   },
// });

// dbConnection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.message);
//   } else {
//     console.log('Connected to the database!');
//   }
// });

// module.exports = dbConnection;


// const pg = require('pg');
// const { dbUrl } = require('./configs');

// const dbConnection = new pg.Client({
//   connectionString: dbUrl,
//   ssl: {
//     rejectUnauthorized: false, // Set this to false to bypass SSL/TLS verification (useful for development, not recommended for production)
//   },
// });

// // Connect to the database
// dbConnection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.message);
//   } else {
//     console.log('Connected to the database!');
//   }
// });

// module.exports = dbConnection;

// const pg = require("pg");
// const {DB_URL} = require("./configs");

// const client = new pg.Client(DB_URL);

// module.exports = client;