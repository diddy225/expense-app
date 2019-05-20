require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
const passportSetup = require('./config/passport-setup');
const session = require("express-session");
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3001

//express middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//cookie expires after 24 hours
app.use(cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY],
    //maxAge: 24 * 60 * 60 * 1000
  })
);

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true },() => {
  console.log("connected to mongo db");
});

//parse cookie
app.use(cookieParser());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

//if production use the client build
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// DEFINE ROUTES
app.use('/api/crud',require('./routes/api/crud'))
app.use('/auth',require('./routes/api/auth'))

const authCheck = (req, res, next) => {
  if(!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    })
  } else {
    next();
  }
};

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookie: req.cookies 
  })
});

// Server is listening on...
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});