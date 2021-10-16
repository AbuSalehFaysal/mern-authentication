const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// config env file
require('dotenv').config({
    path: './config/config.env'
}) 

// connect to database
connectDB();

// use body parser
app.use(bodyParser());

// config for only development
if(process.env.NODE_ENV === 'development'){
    // cors allow to deal with react for localhost at port 3000 without any problem
    app.use(cors({
        origin: process.env.CLIENT_URL 
    }))

    // morgan 
    app.use(morgan('dev'))
}

// load all routes
const authRouter = require('./routes/auth.route'); 
const { connect } = require('./routes/auth.route');

// use routes
app.use('/api/', authRouter);

app.use((req, res, next) => {
    req.status(404).json({
        success: false,
        message: "Page Not Found!"
    })
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("SERVER HAS STARTED...");
})