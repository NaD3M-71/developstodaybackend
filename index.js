const express = require('express');
const cors = require("cors");
const router = require('./routes/index');

const {FRONTEND_URL,DB_URL} = process.env;

// server
const app = express();

//routes
app.use('/', router())

// cors
app.use(cors({
    origin: 'http://localhost:3000',  
    methods: 'GET,POST',              
  }));

// port
app.listen(5000);