"use strict";

const movieData = require('../Movie Data/data.json');

const express = require("express");

const Router = express.Router();


function Movie(title,poster_path,overview,release_date,id)
{
this.title = title;
this.poster_path=poster_path;
this.overview = overview;
this.release_date=release_date;
this.id=id;
}
const movie = new Movie(movieData.title, movieData.poster_path, movieData.overview, movieData.release_date,movieData.genre_ids);

Router.get("/", (req, res, next) => {
  try
  {
    res.status(200).send(JSON.stringify(movie));
  }
  catch(error)
  {
    next(`Main Route ${error}`)
  }
});



Router.get('/favorite', (req,res)=>
{
  res.send('Welcome to Favorite Page');
}
);




    


module.exports = Router;