const express = require("express");

const Router = express.Router();

// server call
// index route
Router.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./Public/pages/default" });
});

// server call
// index route
Router.get("/index.html", (req, res) => {
  res.sendFile("index.html", { root: "./Public/pages/default" });
});

// server call
// default profile
Router.get("/profile.html", (req, res) => {
  res.sendFile("default_profile.html", { root: "./Public/pages/default" });
});

// server call
// default course search
Router.get("/search.html", (req, res) => {
  res.sendFile("search.html", { root: "./Public/pages/default" });
});

// server call
// default course page
Router.get("/course_default.html", (req, res) => {
  res.sendFile("course_default.html", { root: "./Public/pages/default" });
});

// server call
// default user search
Router.get("/users_search.html", (req, res) => {
  res.sendFile("users_search.html", { root: "./Public/pages/default" });
});

// server call
//register
Router.get("/register.html", (req, res) => {
  res.sendFile("register.html", { root: __dirname + "/Public/pages/default" });
});

// server call
Router.get("/log_in.html", (req, res) => {
  res.sendFile("log_in.html", {
    root: __dirname + "/Public/pages/default",
  });
});

module.exports = Router;
