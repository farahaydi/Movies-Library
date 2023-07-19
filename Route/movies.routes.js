"use strict";
const express = require("express");
const dbconection = require("../connection");
const Router = express.Router();
const cors = require("cors");
const axios = require('axios');

Router.use(cors());

function Movie(title, poster_path, overview, id) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
  this.id = id;
}

Router.post('/addMovie', (req, res, next) => {
  try {
    let title = req.body.t;
    let actor = req.body.a;
    let overview = req.body.o;
    let comment = req.body.c;

    let sql = `INSERT INTO movie (title, actor, overview, comment) VALUES ($1, $2, $3, $4)`;
    dbconection.query(sql, [title, actor, overview, comment]).then(() => {
      res.status(201).send(`You Added ${title} Movie`);
    });
  } catch (e) {
    next(`addMovie Error Handler : ${e}`);
  }
});

Router.get('/getMovies', (req, res, next) => {
  try {
    let sql = `SELECT * FROM movie`;
    dbconection.query(sql).then((movieData) => {
      res.status(200).send(movieData.rows);
    });
  } catch (e) {
    next(`getMovies Error Handler : ${e}`);
  }
});

// Router.put("/update/:id", (req, res, next) => {
//   try {
//     let { newComment } = req.body;
//     let sql = `UPDATE movie SET comment=$1 WHERE id=${req.params.id}`;

//     dbconection.query(sql, [newComment]).then((data) => {
//       res.status(200).send(`Updated`);
//     });
//   } catch (e) {
//     next(`Update Error Handler : ${e}`);
//   }
// });

Router.put("/update/:id", (req, res, next) => {
  try {
    let { comment } = req.body;
    console.log("Movie ID to update:", req.params.id);
    console.log("New Comment:", comment);

    let sql = `UPDATE movie SET comment=$1 WHERE id=${req.params.id}`;

    dbconection.query(sql, [comment]).then((data) => {
      console.log("Update successful:", data);
      res.status(200).send(`Updated`);
    });
  } catch (e) {
    console.error("Update Error:", e);
    next(`Update Error Handler : ${e}`);
  }
});


Router.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let sql = `DELETE FROM movie WHERE id=${id}`;
    let data = await dbconection.query(sql);
    res.status(204).end();
  } catch (e) {
    next(`Delete Error Handler : ${e}`);
  }
});

Router.get("/getOneMovie/:id", (req, res) => {
  try {
    let sql = `SELECT * FROM movie WHERE id=${req.params.id}`;
    dbconection.query(sql).then((movieData) => {
      res.status(200).send(movieData.rows[0]);
    });
  } catch (e) {
    next(`getOneMovie Error Handler : ${e}`);
  }
});

Router.get('/trending', async (req, res) => {
  try {
    let trend = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.APIKEY}&language=en-US`);
    let trendingArray = trend.data.results;
    let trendy = [];
    for (let index = 0; index < trendingArray.length; index++) {
      let m = new Movie(trendingArray[index].title, trendingArray[index].poster_path, trendingArray[index].overview, trendingArray[index].id);
      trendy.push(m);
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(trendy);
  } catch (error) {
    res.status(500).send("Error fetching trending movies");
  }
});

module.exports = Router;
