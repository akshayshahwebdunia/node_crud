require("dotenv").config();
const express = require("express");
try {
  app = express();
  port = process.env.PORT || 8080;
  var mongoose = require("mongoose");
  const bodyParser = require("body-parser");
  const cookieParser = require("cookie-parser");
  const flash = require("connect-flash");
  const session = require("express-session");
const expressValidator=require('express-validator');
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SECRET,
      cookie: { maxAge: 60000 },
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(flash());
  expressLayouts = require("express-ejs-layouts");
  app.use(express.static(__dirname + "/public"));
  app.set("view engine", "ejs");
  app.use(expressLayouts);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended : true }));
  app.use(expressValidator());
  app.use(require("./app/routes"));

  //Set up default mongoose connection
  var mongoDB = process.env.DB_URL;
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  //Get the default connection
  var db = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  app.listen(port, () => {
    console.log(`Server started on localhost:${port}`);
  });
} catch (error) {
  console.log(error);
}
