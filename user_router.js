const express = require("express");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { auth, authAdmin } = require("./auth/auth");
const Course = require("./models/Course");
const axios = require("axios");
const fs = require("fs");

const Router = express.Router();

//get course data and make it into html template
function makeCourse(course) {
  let code = course.code;
  let name = course.name;
  let description = course.description;
  let Rating = course.Rating;
  let reviews = course.reviews;

  let html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <!-- Required meta tags -->
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
  
      <!-- Bootstrap CSS -->
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />
  
      <!-- Fontawesome-->
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
  
      <link rel="stylesheet" type="text/css" href="../../styles/course_page.css" />
      <script
        src="https://kit.fontawesome.com/2028cdce13.js"
        crossorigin="anonymous"
      ></script>
  
      <title>UofTCourses - CSC309</title>
    </head>
    <body>
      <div class="banner">
        <div class="row">
          <div class="col-md-12 navbar-color">
            <nav class="navbar navbar-md navbar-color">
              <div class="navbar-brand">UofT course reviews</div>
              <ul class="nav">
                <li class="nav-item">
                  <a class="nav-link" href="/user/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/user/search">Courses</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/user/profile">Profile</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/user/log_out">Logout</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
  <div class="container-fluid course_page">
  <div class="container">
    <div class="row py-3 course_white course_header">
      <div class="col d-flex align-items-center justify-content-center">
        <h1 class="course_title text-center">${course.code}</h1>
      </div>
      <div class="col">
        <h1>${course.name}</h1>
        <p>
          ${course.description}
        </p>
        <i id="courseStar1" class="material-icons">star</i>
        <i id="courseStar2" class="material-icons">star</i>
        <i id="courseStar3" class="material-icons">star</i>
        <i id="courseStar4" class="material-icons">star</i>
        <i id="courseStar5" class="material-icons">star_border</i>
      </div>
    </div>
    <div id="reviews"></div>
  </div>
</div>
  `;
  return html;
}

//get course review and make it into html template
function makeReview(review, id) {
  let name = review.reviewerName;
  let rating = review.rating;
  let session = review.session;
  let title = review.title;
  let description = review.description;

  let url = `/user/user/id/${id}`;

  let html = `
  <div class="col">
            <div class="card h-100 course_card_green">
              <div class="card-header">
                <h5>
                  <a href=${url}>${name}</a>
                  <span class="course_sem">${session}</span>
                </h5>
              </div>
              <div class="card-body">
                <h2 class="card-title">${title}</h2>
                <p class="card-text">${description}</p>
              </div>
              <div class="card-footer">
                <div>
                  <i class="material-icons">star</i>
                  <i class="material-icons">star</i>
                  <i class="material-icons">star</i>
                  <i class="material-icons">star</i>
                  <i class="material-icons">star</i>
                </div>
              </div>
            </div>
          </div>
  `;
  return html;
}

// server call
// index route
Router.get("/", auth, (req, res) => {
  res.sendFile("user_index.html", { root: "./Public/pages/user" });
});

// server call
// index route
Router.get("/index.html", auth, (req, res) => {
  res.sendFile("user_index.html", { root: "./Public/pages/user" });
});

// server call
// user profile
Router.get("/profile", auth, (req, res) => {
  res.sendFile("user_profile.html", { root: "./Public/pages/user" });
});

// server call
// user course search
Router.get("/search", auth, (req, res) => {
  res.sendFile("user_search.html", { root: "./Public/pages/user" });
});

// server call
//log out
Router.get("/log_out", auth, (req, res) => {
  res.clearCookie("token").redirect("/");
});

// server call
// user course page
Router.get("/course/:id", auth, (req, res) => {
  Course.findById(req.params.id, (err, course) => {
    if (err) {
      console.log(err);
    } else {
      //reviewer id

      let html = makeCourse(course);
      for (let i = 0; i < course.reviews.length; i++) {
        let rid = course.reviews[i].reviewer;
        // parse the to string
        rid = JSON.stringify(rid);

        // with out the quotes
        rid = rid.substring(1, rid.length - 1);

        console.log(rid);
        html += makeReview(course.reviews[i], rid);
      }

      html += ` 
        <div class="row py-3 course_white course_header">
          <div class="course_form">
            <h1>Add a Review:</h1>
            <form id="addreview" action="/user/review/${req.params.id}" method="post">
            <h3>Review Title:</h3>
            <input type="text" id="reviewTitle" placeholder="Review Title" name="title">
            <h3>Description:</h3>
            <input type="text" placeholder="Description" name="description">
            <h3>Session:</h3>
            <input type="text" id="session" placeholder="Session" name="session">
            <h3>Rating:</h3>
            <div class="rating">
              <input type="radio" id="star5" name="rating" value="5" />
              <label for="star5">5 stars</label>
              <input type="radio" id="star4" name="rating" value="4" />
              <label for="star4">4 stars</label>
              <input type="radio" id="star3" name="rating" value="3" />
              <label for="star3">3 stars</label>
              <input type="radio" id="star2" name="rating" value="2" />
              <label for="star2">2 stars</label>
              <input type="radio" id="star1" name="rating" value="1" />
              <label for="star1">1 star</label>
            </div>
            <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="footer-col">
            <h4>company</h4>
            <ul>
              <li><a href="#">about us</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Courses</h4>
            <ul>
              <li><a href="user_search.html">all courses</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Sign up today</h4>
            <ul>
              <li><a href="user_profile.html">Profile</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Uoft Socials</h4>
            <div class="social-links">
              <a
                href="https://twitter.com/UofT?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                ><i class="fab fa-facebook-f"></i
              ></a>
              <a href="https://www.facebook.com/universitytoronto/"
                ><i class="fab fa-twitter"></i
              ></a>
              <a href="https://www.instagram.com/uoft/?hl=en"
                ><i class="fab fa-instagram"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <script type="text/javascript" src="../../scripts/course_user.js"></script>

    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"
      integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D"
      crossorigin="anonymous"
      async
    ></script>
    <script>
    const render = function (reviews) {
      var review_html = "";
      for (var i = 0; i < reviews.length; i++) {
        review_html += renderReview(reviews[i]);
      }
      return review_html;
    };
    
    //append review to the page
    const appendReview = function (reviews) {
      var review_html = render(reviews);
      $("#reviews").append(review_html);
    };
    
    appendReview(reviews);
      </script>    
  </body>
</html> `;
      res.send(html);
    }
  });
});

// server call
//get course by id
Router.get("/courses/:id", (req, res) => {
  const _id = req.params.id;
  Course.findById(_id, (err, course) => {
    if (err) {
      console.log(err);
    } else {
      res.send(course);
    }
  });
});

// server call
//create rgistration
Router.post("/register", (req, res) => {
  const { f_name, l_name, password_set, password_confirm } = req.body;
  if (password_set !== password_confirm) {
    res.send("Passwords do not match");
  } else {
    //encrypt password
    const password = req.body.password_set;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      FirstName: f_name,
      Email: l_name,
      Password: hash,
    });
    newUser
      .save()
      .then((user) => {
        //redirect to login page
        res.redirect("/");
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

// server call
//login
Router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ Email: email });
    if (!user) {
      res.send("User not found");
    } else {
      const isMatch = bcrypt.compareSync(password, user.Password);
      if (isMatch) {
        const token = jwt.sign({ _id: user._id }, "Humera");
        user.tokens = user.tokens.concat({ token });
        await user.save();
        //if user role is admin
        if (user.Role === "admin") {
          //  set cookie with token and redirect to admin page
          res
            .cookie("token", token, { maxAge: 900000, httpOnly: true })
            .redirect("/admin/admin_index.html");
        } else if (user.Role === "user"){
          res
            .cookie("token", token, { maxAge: 900000, httpOnly: true })
            .redirect("/user/");
        } else {
          res
          .cookie("token", token, { maxAge: 900000, httpOnly: true })
          .redirect("/default/");
        }
      } else {
        res.send("Incorrect password");
      }
    }
  } catch (err) {
    res.send(err);
  }
});

// server call
//get all users
Router.get("/all", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

// server call
//get user by user_id
Router.get("/user", auth, async (req, res) => {
  try {
    let id = req.user._id;
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

// server call
//get user by id
Router.get("/user/id/:id", auth, async (req, res) => {
  try {
    let id = req.params.id;
    const user = await User.findById(id);
    let html = ``;

    let url = `/admin/update_user/${id}`;

    html += `
    <!DOCTYPE html>


    <html lang="en">
  <head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/css/bootstrap.min.css' rel='stylesheet'>
    <link href='../../styles/profile.css' rel='stylesheet'>
    <script
    src="https://kit.fontawesome.com/2028cdce13.js"
    crossorigin="anonymous"
    ></script>
    <!-- Fontawesome-->
    <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
    />
    <title>UofTCourses - Profile</title>
</head>


    <style>
    /* some css elements are from or adapted https://www.bootdey.com/snippets/view/profile-edit-settings */
.avatar img {
  width: 150px;
  border-radius: 50%;
}

img {
  vertical-align: middle;
}

.mytable {
  width: 100%;
}

.banner .page-margin {
  margin-left: 80px;
}

.empty-column {
  display: none;
}

.form-control {
  display: block;
  width: 100%;
  /* height: calc(1.5em + 0.75rem + 2px); */
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #414447;
  background-color: #e2e2e2;
  background-clip: padding-box;
  border: 1px solid #eef0f3;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin-top: 5px;
  margin-bottom: 5px;
}

.form-select {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #414447;
  background-color: #e2e2e2;
  background-clip: padding-box;
  border: 1px solid #eef0f3;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin-top: 5px;
  margin-bottom: 5px;
}

.comment-box {
  width: 375px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 10px 10px 5px #56575b;
}

.my-icon {
  vertical-align: middle;
  left: 50%;
}

.banner {
  height: 80vh;
  width: 100%;
  background: #fff;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
}

/* navbar stuff starts here */
.navbar-color {
  background-color: rgb(0, 42, 90);
}

.navbar-brand {
  color: #fff;
  font: size 22px;
  font-weight: 700;
  margin-left: 10%;
}

.nav {
  margin-right: 10%;
}

.nav li a {
  color: rgb(168, 173, 172);
  font: size 1.4em;
  font-weight: 200;
}

.nav li a:hover {
  color: rgb(1, 108, 238);
}

/* navbar stuff ends here  */

/* CSS past this is for footer */
.container {
  max-width: 1170px;
  margin: auto;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
ul {
  list-style: none;
}
.footer {
  background-color: rgb(0, 42, 92);
  padding: 50px 0;
}
.footer-col {
  width: 25%;
  padding: 0 15px;
}
.footer-col h4 {
  font-size: 18px;
  color: #ffffff;
  text-transform: capitalize;
  margin-bottom: 35px;
  font-weight: 500;
  position: relative;
}
.footer-col h4::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  background-color: #e91e63;
  height: 2px;
  box-sizing: border-box;
  width: 50px;
}
.footer-col ul li:not(:last-child) {
  margin-bottom: 10px;
}
.footer-col ul li a {
  font-size: 16px;
  text-transform: capitalize;
  color: #ffffff;
  text-decoration: none;
  font-weight: 300;
  color: #bbbbbb;
  display: block;
  transition: all 0.3s ease;
}
.footer-col ul li a:hover {
  color: #ffffff;
  padding-left: 8px;
}
.footer-col .social-links a {
  display: inline-block;
  height: 40px;
  width: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 10px 10px 0;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  color: #ffffff;
  transition: all 0.5s ease;
}
.footer-col .social-links a:hover {
  color: #24262b;
  background-color: #ffffff;
}

    </style>


    <nav class="navbar navbar-md navbar-color">
    <div class="navbar-brand">UofT course reviews</div>
    <ul class="nav">
      <li class="nav-item">
        <a class="nav-link" href="/user/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/user/search">Courses</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/user/profile">Profile</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/user/log_out">Logout</a>
      </li>
    </ul>
  </nav>


  <div class="container">
  <!-- <div class="row justify-content-center"> -->
      <div class="col-12 mx-auto">
      <!-- <div class="col-12 col-lg-10 col-xl-8 mx-auto"> -->
          <h3 class="mb-4 page-title" style="margin-left: 80px;">User Profile</h3>
          <div class="my-4">
              <!-- SETTINGS -->
                  <div class="row mt-5 align-items-center">
                      <div class="col-md-3 text-center mb-5">
                          <div class="avatar">
                            <img src="https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_1280.png"/>
                          </div>
                      </div>
                      <div class="col">
                          <div class="row align-items-center">
                              <div class="col-md-7">
                                  <h4 class="mb-1">${user.FirstName}</h4>
                                  <p></p>
                              </div>
                          </div>
                          <div class="description">
                              <p>${user.Description}</p>
                          </div>
                      </div>
                  </div>


              
                  <!-- beginning of settings -->
                    <hr class="my-4" />
                    <h3 class="mb-4 mt-5 page-title">User Settings</h3>
                        <form class="form" id="user_update" action="${url}" method="post">
                           
                                <label for="inputEmail4">Email</label>
                                <input type="email" class="form-control" id="inputEmail4" placeholder="Email" name="Email">
                          
                            
                                <label for="inputPassword4">Password</label>
                                <input type="password" class="form-control"  placeholder="Password" name="Password"> 
                           

                           
                                <label for="inputPassword4">First Name</label>
                                <input type="text" class="form-control"  placeholder="First Name"  name="FirstName">
                           

                            
                                <label for="inputPassword4">Description</label>
                                <input type="text" class="form-control"  placeholder="Description" name="Description">
                            

                        
                            <button type="submit" class="btn btn-primary">Update</button>

                            

                        
                        </form>


                        <footer class="footer">
                        <div class="container">
                          <div class="row">
                            <div class="footer-col">
                              <h4>company</h4>
                              <ul>
                                <li><a href="#">about us</a></li>
                              </ul>
                            </div>
                            <div class="footer-col">
                              <h4>Courses</h4>
                              <ul>
                                <li><a href="search.html">all courses</a></li>
                              </ul>
                            </div>
                            <div class="footer-col">
                              <h4>Sign up today</h4>
                              <ul>
                                <li><a href="default_profile.html">Profile</a></li>
                              </ul>
                            </div>
                            <div class="footer-col">
                              <h4>Uoft Socials</h4>
                              <div class="social-links">
                <a href="https://twitter.com/UofT?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" class="twitter"><i class="fa fa-twitter"></i></a>
    
                ></a>
                <a href="https://www.facebook.com/universitytoronto/"
                  ><i class="fab fa-twitter"></i
                ></a>
                <a href="https://www.instagram.com/uoft/?hl=en"
                  ><i class="fab fa-instagram"></i
                ></a>
              </div>
                            </div>
                          </div>
                        </div>
                      </footer>
                
                </body>
                </html>
    `;

    res.send(html);
  } catch (error) {
    console.log(error);
  }
});


// server call
//delete user
Router.get("/delete/:id", authAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/admin/users_search.html");
  } catch (error) {
    console.log(error);
  }
});

//function for calculating rating
function calculateRating(course) {
  let rating = 0;
  let total = 0;
  for (let i = 0; i < course.reviews.length; i++) {
    rating += course.reviews[i].rating;
    total++;
  }
  if (total === 0) {
    return 0;
  } else {
    return rating / total;
  }
}

// server call
//course review by user
Router.post("/review/:id", auth, async (req, res) => {
  try {
    //push user review to course
    const course = await Course.findById(req.params.id);

    const review = {
      reviewer: req.user._id,
      description: req.body.description,
      title: req.body.title,
      rating: req.body.rating,
      session: req.body.session,
      reviewerName: req.user.FirstName,
    };
    course.reviews.push(review);

    //calculate rating and save to course
    course.Rating = calculateRating(course);

    //save course
    await course.save();
    res.redirect("/user/course/" + req.params.id);
  } catch (error) {
    console.log(error);
  }
});

module.exports = Router;
