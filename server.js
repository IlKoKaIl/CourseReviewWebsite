/* server.js - Express server*/
"use strict";
const log = console.log;
log("Express server");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
// need body parser
const bodyParser = require("body-parser");
const path = require("path");
const { config } = require("dotenv");

config({
  path: __dirname + "./.env",
});

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
//cookie parser
app.use(require("cookie-parser")());

// mongoose uri
const uri = process.env.MONGODB_URI || 'mongodb+srv://admin:admin@mihirtest.kdbvk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&wtimeoutMS=5000';

mongoose.connect(uri, () => log("connected to mongoose db"));

// server call
// middleware
const adminRoutes = require("./admin_router");
app.use("/admin", adminRoutes);

// server call
const defaultRoutes = require("./default_router");
app.use("/default", defaultRoutes);

// server call
const userRoutes = require("./user_router");
app.use("/user", userRoutes);

// server call
app.get("/", (req, res) => {
  res.sendFile("log_in.html", { root: "./Public/pages/default" });
});

// // Setting up a static directory for the files in /pub
// // using Express middleware.
// // Don't put anything in /pub that you don't want the public to have access to!
// app.use(express.static(path.join(__dirname, "/pub")));

// // Let's make some express 'routes'
// // Express has something called a Router, which
// // takes specific HTTP requests and handles them
// // based on the HTTP method and URL

// // Let's make a route for an HTTP GET request to the
// // 'root' of our app (i.e. top level domain '/')

// app.get("/", (req, res) => {
//   // sending a string
//   res.send("This should be the root route!");

//   //sending some HTML
//   // res.sendFile(path.join(__dirname, '/pub/example.html'))
// });

// Error codes
app.get("/problem", (req, res) => {
  // You can indicate a status code to send back
  // by default it is 200, but it's up to you
  // if you want to send something
  res.status(500).send("There was a problem on the server");

  // don't send nonsense status codes like this one:
  //res.status(867).send('There was a problem on the server')
});

// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
}); // localhost development port 5000  (http://localhost:5000)
// We've bound that port to localhost to go to our express server.
// Must restart web server when you make changes to route handlers.
