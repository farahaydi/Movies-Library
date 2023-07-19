// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const axios = require('axios');

// const movieRoute = require('./Route/movies.routes');
// const mainRoute = require('./Route/mainRoute.routes');
// const notFound = require('./errorHandler/404');
// const internalError = require('./errorHandler/500');

// const dbConnection = require('./connection');

// let server = express();

// // Middleware
// server.use(cors());
// server.use(express.json());

// // Routes
// server.use(mainRoute);
// server.use(movieRoute);

// // Error Handling Middleware
// server.use(notFound);
// server.use(internalError);

// // Database connection has already been established in connection.js

// // Start the server
// server.listen(3004, () => {
//   console.log('Server is running on port 3004');
// });

'use strict';
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');


const movieRoute = require('./Route/movies.routes');
const mainRoute = require('./Route/mainRoute.routes');
const notFound = require('./errorHandler/404');
const internalError = require('./errorHandler/500');

const dbconection = require('./connection');

let server = express();
server.use(cors()); 
server.use(express.json());

dbconection.connect().then(() => {
  server.listen(3003, () => {
    console.log('Server is running');
  });
});
server.use(mainRoute);
server.use(movieRoute);
server.use(notFound);
server.use(internalError);

// 'use strict';
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const axios = require('axios');

// const movieRoute = require('./Route/movies.routes');
// const mainRoute = require('./Route/mainRoute.routes');
// const notFound = require('./errorHandler/404');
// const internalError = require('./errorHandler/500');

// const dbconection = require('./connection');

// let server = express();

// // Middleware
// server.use(cors());
// server.use(express.json());

// // Routes
// server.use(mainRoute);
// server.use(movieRoute);

// // Error Handling Middleware
// server.use(notFound);
// server.use(internalError);

// // Database Connection
// dbconection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//   } else {
//     console.log('Connected to database');
//     // Start the server after successful database connection
//     server.listen(3004, () => {
//       console.log('Server is running on port 3004');
//     });
//   }
// });

