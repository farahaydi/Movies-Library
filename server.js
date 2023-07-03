'use strict'
const express = require("express");
require('dotenv').config();
const movieData = require('./Movie Data/data.json');
const axios = require("axios");
const pg = require('pg');
let server = express();
server.use(express.json());



//constructor
function Movie(title,poster_path,overview,release_date,id)
{
this.title = title;
this.poster_path=poster_path;
this.overview = overview;
this.release_date=release_date;
this.id=id;
}

const movie = new Movie(movieData.title, movieData.poster_path, movieData.overview, movieData.release_date,movieData.genre_ids);
// Start server
// const ser = server.listen(3000, ()=>{
//   console.log('Server is running')
//   });
//DB connection
const dbUrl = process.env.DB;
const dbconection = new pg.Client(dbUrl);
dbconection.connect().then(()=>{
  server.listen(3000, ()=>{
    console.log('Server is running')
    });

});


// Routes


server.post('/addMovie', (req,res)=>
  {
    req.body
    let title = req.body.t;
    let actor = req.body.a;
    let overview = req.body.o;
    let comment =req.body.c;

    let sql = `insert into movie (title,actor,overview,comment) values($1,$2,$3,$4)`;
    dbconection.query(sql,[title,actor,overview,comment]).then(()=>{
      res.status(201).send(`You Added ${title} Movie`)
    })


    // res.send(req.body)
  });


server.get('/getMovies', (req,res)=>
{
  let sql = `select * from movie`
  dbconection.query(sql).then((movieData)=>{
    res.status(200).send(movieData.rows)
  })
});


server.get('/', handleMovie);
server.get('/trending', async(req, res)=>
{
  let trend = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.APIKEY}&language=en-US`);
  let trendingArray = trend.data.results;
  let trendy=[] ;
  for (let index = 0; index < trendingArray.length; index++) {
    let m= new Movie(trendingArray[index].title, trendingArray[index].poster_path , trendingArray[index].overview, trendingArray[index].release_date, trendingArray[index].id);
    trendy.push(m);
    }
  res.send(trendy);


});

server.get('/search', async(req, res)=>
{
const movieTitle = req.query.title;
let serchData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=${movieTitle}`);
res.send(serchData.data);
});


//name/ overview
server.get('/personList', async(req, res)=>  
{
  let personData = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.APIKEY}&language=en-US&page=1`);
  let personArray = personData.data.results; 
  let list=[] ;
  for (let index = 0; index < personArray.length; index++) {
    list.push({name:personArray[index].name,
              id: personArray[index].id,
              profile_path : personArray[index].profile_path,
              known_for :personArray[index].known_for
            
            })
    
    }
  res.send(list);
});

server.get('/popularSeries', async(req,res)=>
{
  let popularSeries = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.APIKEY}&language=en-US&page=1&sort_by=popularity.desc`);
  let SeriesArray = popularSeries.data.results;
  let series=[] ;
  for (let index = 0; index < SeriesArray.length; index++) {
    let m= new Movie(SeriesArray[index].name, SeriesArray[index].poster_path , SeriesArray[index].overview, SeriesArray[index].release_date, SeriesArray[index].id);
    series.push(m);
    }
  res.send(series);
});


server.put("/update/:id", (req, res) => {
  let { newComment } = req.body;
    let sql = ` UPDATE movie SET comment=$1 WHERE id=${req.params.id}`;

    dbconection.query(sql, [newComment]).then((data) => {
      res.status(200).send(`Updated`);
    });
  });

server.delete("/delete/:id", async (req, res) => {
  
    let { id } = req.params;
    let sql = `DELETE FROM movie WHERE id =${id}`;
    let data = await dbconection.query(sql);
    res.status(204).end();
});

server.get("/getOneMovie/:id", (req, res) => {
 // let id = req.params.id;
  let sql = `SELECT * From movie where id=${req.params.id}`;
  dbconection.query(sql).then((movieData) => {
    res.status(200).send(movieData.rows[0]);
  });
});




server.get('/favorite', handleFavorite);




  function handleFavorite(req, res) {
    res.send('Welcome to Favorite Page');
  }


function handleMovie(req, res) {
  res.send(JSON.stringify(movie));
}

// function handleServerStart() {
//     console.log('Server is running');
//   }

// server.use((req, res, next) => {
//   if (req.query.pass == "1234") {
//     next();
//   } else {
//     next("Wrong password please try again");
//   }
// });
server.use((err, req, res, next) => {
  res.status(500).send({
    code: 500,
    message: "Server Error",
    error: err,
  });
}); 
  

server.use((req,res,next)=>
{
  res.status(404).send({
          status: 404,
          responseText: 'Page not found error',
})}
)
