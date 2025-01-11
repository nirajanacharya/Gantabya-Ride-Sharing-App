
const express = require('express');
const app=express();
const dotenv=require('dotenv'); 
const cors=require('cors');
dotenv.config();
const connectToDb=require('./db/db');
const userRoutes=require('./routes/user.routes');
const CaptainRoutes = require('./routes/captain.routes');  
const cookie = require('cookie-parser');  

connectToDb();
app.use(cors());

app.use(cookie());  
app.get('/health',(req,res)=>{
    res.json({
        code:null,
        status:'SUCCESS'
    })
})
app.use(express.json());

app.use('/users',userRoutes)
app.use('/captains',CaptainRoutes);

module.exports = app;