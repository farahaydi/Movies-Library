'use strict'
const express = require("express");
const movieData = require('./Movie Data/data.json');
let server = express();

//constructor
function Movie(title,genre_ids, original_language, original_title,poster_path,video,vote_average,overview,release_date,vote_count,id,adult,backdrop_path,popularity, media_type)
{
this.title = title;
this.genre_ids = genre_ids;
this.original_language= original_language;
this.original_title = original_title;
this.poster_path=poster_path;
this.video=video;
this.vote_average = vote_average;
this.overview = overview;
this.release_date=release_date;
this.vote_count=vote_count;
this.id=id;
this.adult=adult;
this.backdrop_path=backdrop_path;
this.popularity=popularity;
this.media_type=media_type;
}

const data = movieData;
const movie = new Movie(data.title,data.genre_ids, data.original_language,data.original_title,data.poster_path,data.video,data.vote_average,data.overview);
const outputData = {title: movie.title,original_language: movie.original_language,overview: movie.overview};

// Start server
const ser = server.listen(3000, handleServerStart);

// Routes
server.get('/', handleMovie);
server.get('/favorite', handleFavorite);
server.get('/error', handleError);
server.get('/*', handlePageNotFound);



function handleServerError(err, req, res, next) {
    if (req.path === '/favorite'|| req.path ==='/') {
      return next(err);
    }
  
    res.status(500).send({ 

    "status": 500,
    "responseText": "Sorry, something went wrong"
 });
  }
  
  // Register the error handling middleware
  server.use(handleServerError);



function handlePageNotFound(req, res) {
    res.status(404).json({
      status: 404,
      responseText: 'Page not found error',
    });
  }
  
  function handleFavorite(req, res) {
    res.send('Welcome to Favorite Page');
  }


function handleMovie(req, res) {
  res.send(JSON.stringify(outputData, null, 2));
}

function handleError(req, res, next) {
  const error = new Error('Simulated Error');
  next(error);
}

function handleServerStart() {
    console.log('Server is running');
  }

