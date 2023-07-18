// 'use strict'
// const express =require('express');
// const Router =express.Router(); //obj call router we add value to it then we export it to main file
// const connect = require("../connection")


"use strict";
const express = require("express");
const dbconection = require("../connection");
const axios =require('axios');
const cors = require("cors");
const Router = express.Router();


// Router.use(cors());



function Movie(title,poster_path,overview,release_date,id)
{
this.title = title;
this.poster_path=poster_path;
this.overview = overview;
this.release_date=release_date;
this.id=id;
}


Router.post('/addMovie', (req,res, next)=>
  {
    try
    {
        req.body
        let title = req.body.t;
        let actor = req.body.a;
        let overview = req.body.o;
        let comment =req.body.c;
    
        let sql = `insert into movie (title,actor,overview,comment) values($1,$2,$3,$4)`;
        dbconection.query(sql,[title,actor,overview,comment]).then(()=>{
          res.status(201).send(`You Added ${title} Movie`)
        });
    }
    catch(e)
    {
        next(`addMovie Error Handler : ${e}`)
    }
   


    // res.send(req.body)
});


Router.get('/getMovies', (req,res, next)=>
{
    try
    {
        let sql = `select * from movie`
        dbconection.query(sql).then((movieData)=>{
          res.status(200).send(movieData.rows)
        })
    }
    catch(e)
    {
        next(`getMovies Error Handler : ${e}`)
    }
 
});

Router.put("/update/:id", (req, res, next) => {
    try 
    {
        let { newComment } = req.body;
        let sql = ` UPDATE movie SET comment=$1 WHERE id=${req.params.id}`;
    
        dbconection.query(sql, [newComment]).then((data) => {
          res.status(200).send(`Updated`);
        });
    }
    catch(e)
    {
        next (`Update Error Handler : ${e}`)
    }
    
});
  
Router.delete("/delete/:id", async (req, res,next) => {
     try 
    {
    let { id } = req.params;
      let sql = `DELETE FROM movie WHERE id =${id}`;
      let data = await dbconection.query(sql);
      res.status(204).end();
    }
    catch(e)
    {
        next (`Delete Error Handler : ${e}`)
    }
      
});
  
Router.get("/getOneMovie/:id", (req, res) => {
   // let id = req.params.id;
   try 
   {
    let sql = `SELECT * From movie where id=${req.params.id}`;
    dbconection.query(sql).then((movieData) => {
      res.status(200).send(movieData.rows[0]);
    });
   }
   catch(e)
   {
    next (`getOneMovie Error Handler : ${e}`)
   }
    
});

Router.get('/trending', async(req, res)=>
{
  let trend = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.APIKEY}&language=en-US`);
  let trendingArray = trend.data.results;
  let trendy=[] ;
  for (let index = 0; index < trendingArray.length; index++) {
    let m= new Movie(trendingArray[index].title, trendingArray[index].poster_path , trendingArray[index].overview, trendingArray[index].release_date, trendingArray[index].id);
    trendy.push(m);
    }
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send(trendy);


});



module.exports = Router;