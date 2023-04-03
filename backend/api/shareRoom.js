
const express = require("express");
const pool = require("../db")

const shareRoom = express.Router()

// user 

shareRoom.post("/user", async (req,res)=>{
    try{
      const {id, first_name, last_name, gender, date_of_birth, username,create_at, occupation, health, email} = req.body;
      console.log(req.body)
      const text = 'INSERT INTO users (id, first_name, last_name, gender, date_of_birth, username,create_at, occupation, health, email) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9, $10) RETURNING *'
      const values = [id,first_name, last_name, gender, date_of_birth, username,create_at, occupation, health, email]
      const newUpdate = await pool.query(text, values);
      res.json(newUpdate.rows[0])
    }catch(err){
       console.error(err.message)
    }
})

// get a user infor

shareRoom.get("/user/:id", async (req,res)=>{
    try{
     const {id} = req.params;
     const text = "SELECT * FROM users WHERE id = $1";
     const user = await pool.query(text, [id]);
     res.json(user.rows[0]);
    }catch(err){
       console.error(err.message)
    }
})


// update user infor 
shareRoom.put("/user/:id", async (req,res)=>{
    try{
      const {id} = req.params;
      const {first_name, last_name, gender, date_of_birth, username,create_at, occupation, health, email} = req.body;
      const text = 'UPDATE users SET first_name =$1, last_name=$2, gender=$3, date_of_birth=$4, username=$5,create_at=$6, occupation=$7, health=$8, email=$9 WHERE id=$10'
      const values = [first_name, last_name, gender, date_of_birth, username,create_at, occupation, health, email,id]
      const newUpdate = await pool.query(text, values);
      res.json( "User was updated")
    }catch(err){
       console.error(err.message)
    }
})


// post a trip 
shareRoom.post("/user/trip", async (req,res)=>{
    try{
      const { user_name, user_id, start_time, end_time, title, place, gender1, gender2, markdown, price} = req.body;
      console.log(req.body)
      const text = 'INSERT INTO trip (user_name, user_id, start_time, end_time, title, place, gender1, gender2, markdown, price) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *'
      const values = [user_name, user_id, start_time, end_time, title, place, gender1, gender2, markdown, price]
      const newUpdate = await pool.query(text, values);
      res.json(newUpdate.rows[0])
    }catch(err){
       console.error(err.message)
    }
})


// get all trip info
shareRoom.get('/trip', async (req,res)=>{
    try{
     const allTrips = await pool.query('SELECT * FROM public.trip ORDER BY id ASC')
     res.json(allTrips.rows);
    }catch(err){
       console.error(err.message)
    }
})

// update a trip info
// delete a trip

shareRoom.delete('/trip/:id', async (req,res)=>{
    try{
      const {id} = req.params
      console.log(id)
     const allTrips = await pool.query('DELETE FROM public.trip WHERE id = $1', [id])
     res.json("Trip was deleted, thank you");
    }catch(err){
       console.error(err.message)
    }
})



module.exports = shareRoom;