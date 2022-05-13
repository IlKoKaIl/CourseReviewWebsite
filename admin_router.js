const express = require("express");
const Course = require("./models/Course");
const axios = require("axios");
const { auth, authAdmin } = require("./auth/auth");
const fs = require("fs");
const User = require("./models/User");

const Router = express.Router();

// server call
// index route
Router.get("/admin_index.html", authAdmin, (req, res) => {
  res.sendFile("admin_index.html", { root: "./Public/pages/admin" });
});

// server call
// admin profile
Router.get("/admin_profile.html", authAdmin, (req, res) => {
  res.sendFile("admin_profile.html", { root: "./Public/pages/admin" });
});

// server call
// admin course search
Router.get("/admin_search.html", authAdmin, (req, res) => {
  res.sendFile("admin_search.html", { root: "./Public/pages/admin" });
});

// server call
// admin course page
Router.get("/course_admin.html", authAdmin, (req, res) => {
  res.sendFile("course_admin.html", { root: "./Public/pages/admin" });
});

// server call
// admin user search
Router.get("/users_search.html", authAdmin, (req, res) => {
  res.sendFile("users_search.html", { root: "./Public/pages/admin" });
});

// server call
//logout
Router.get("/logout", authAdmin, (req, res) => {
  //delete cookie
  res.clearCookie("token");
  res.redirect("/");
});

// server call
//fetch courses from api and save to db
Router.get("/fetch_courses", authAdmin, async (req, res) => {
  try {
    const response = await axios.get("https://nikel.ml/api/courses?limit=100");
    const courses = response.data;
    console.log(courses.response.length);
    for (let i = 0; i < courses.response.length; i++) {
      const course = new Course({
        // "id": "CHE221H1F20209",
        id: courses.response[i].id,
        // "code": "CHE221H1",
        code: courses.response[i].code,
        // "name": "Calculus III",
        name: courses.response[i].name,
        // "description": "Introduces the basic...",
        description: courses.response[i].description,
        // "division": "Faculty of Applied Science \u0026 Engineering",
        division: courses.response[i].division,
        // "department": "Chemical Engineering and Applied Chemistry",
        department: courses.response[i].department,
        // "prerequisites": null,
        prerequisites: courses.response[i].prerequisites,
        // "corequisites": null,
        corequisites: courses.response[i].corequisites,
        // "exclusions": null,
        exclusions: courses.response[i].exclusions,
        // "recommended_preparation": null,
        recommended_preparation: courses.response[i].recommended_preparation,
        // "level": "200/B",
        level: courses.response[i].level,
        // "campus": "St. George",
        campus: courses.response[i].campus,
        // "term": "2020 Fall",
        term: courses.response[i].term,
        // "arts_and_science_breadth": null,
        arts_and_science_breadth: courses.response[i].arts_and_science_breadth,
        // "arts_and_science_distribution": null,
        arts_and_science_distribution:
          courses.response[i].arts_and_science_distribution,
        // "utm_distribution": null,
        utm_distribution: courses.response[i].utm_distribution,
        // "utsc_breadth": null,
        utsc_breadth: courses.response[i].utsc_breadth,
        // "apsc_electives": null,
        apsc_electives: courses.response[i].apsc_electives,
      });
      await course.save();
    }
    res.send(courses);
  } catch (error) {
    console.log(error);
  }
});

// server call
//create course
Router.post("/create", authAdmin, async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.send(course);
  } catch (error) {
    console.log(error);
  }
});

// server call
//get all courses
Router.get("/all", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.send(courses);
  } catch (error) {
    console.log(error);
  }
});

// server call
//get course by id
Router.get("/:id", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.send(course);
  } catch (error) {
    console.log(error);
  }
});

// server call
//update course
Router.put("/:id", authAdmin, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(course);
  } catch (error) {
    console.log(error);
  }
});

// server call
//delete course
Router.delete("/:id", authAdmin, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    res.send(course);
  } catch (error) {
    console.log(error);
  }
});

// server call
//Update user
Router.post("/update_user/:id", authAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.redirect("/admin/users_search.html");
  } catch (error) {
    console.log(error);
  }
});

// server call
//delete user
Router.delete("/delete_user/:id", authAdmin, async (req, res) => {
  try {
    const user = await Course.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

// server call
//create user
Router.post("/create_user", authAdmin, async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = Router;
