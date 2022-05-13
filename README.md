# UofTCourses

To run after downloading/cloning the repo you need to run npm install i and npm install express.
Then you run node server.js from the directory of the code and then go to localhost:3500 to view the page

## Heroku Link
https://secure-mesa-10679.herokuapp.com/

## Description

The first thing most UofT students do when they hear of a course is search it up on google and end up on a reddit thread containing the course code. However, there are many disadvantages to that because of a lack of responses and a lack of information readily available. UofTCourses aims to fix that issue by providing UofT courses information about their courses on a single centralized platform populated with information from UofT students for UofT students.

UofTCourses that rates the various courses offered by UofT and describes the experiences that students have had as well as gives a brief meaningful summary to its users. UofT students will be able to use this information to be able to make informed decisions about their classes. The target audience is UofT students as this service will primarily be used by students across all 3 campuses to get a better idea of what to expect.

## Starting Point

The starting page of our website is located in /pages/default/index.html

## List of Features Implemented

### Global features

Navbar on every page that properly adapts whether there is a non-logged-in user, a logged-in user or an admin user.

Footer on every page

### Log in features:

When we first load the website, we go in the view of a non-logged in user.

To log-in as a user or an admin, we can click on ‘login/register’ in the navbar. Then, in the log-in page, as stated in the handout, we use the following login credentials for our login functionality to be consistent:

- Username: user; password: user.
  This will log us in as a standard user
- Username: admin; password: admin.
  This will log us in as a standard admin

When logged in, the navbar will have a ‘logout’ option to logout.

### Course Search page features:

In our search page, we have a table of courses with the following headings:

- Course code
- Course name
- Department
- Course level
- Rating score

When clicking on the course code, the user will be taken to the course’s individual page. Right now, since we are just in phase1, we will only include one course page, CSC309.

We could sort the table by each heading.

There is also a search feature on the top right of the table to filter courses. This works for every column and they are all sortable.

In the admin view, admins will be given the option to delete each course (each table row will have a delete button)

### User search page features (visible to admin only):

In our user search page, we have a table of users with the following headings:

- UserID
- First name
- Last name

When clicking on the userID, the user will be taken to the user’s profile page. Right now, since we are just in phase1, we will only include one user profile page, Mihir Koka’s.

We could sort the table by each heading.

There is also a search feature on the top right of the table to filter users. This works for every column and they are all sortable.

In the admin view, admins will be given the option to delete each user (each table row will have a delete button)

### Individual Course page features:

Each individual course page includes the course title, its description, all its individual reviews, and a total rating calculated from all reviews.

Each review will have different background colours:

- light green if the review has over a 3/5 rating
- light red if the review has under a 3/5 rating
- white if the review has a 3/5 rating

There are three views for each individual course page:

- The default view where a default (not logged in) user can see a course and its reviews
- The user view for standard (logged-in user) where a user can
  add a review with the form on the bottom of the page
- The admin view for admin users where an admin can
  edit course title, edit course description and delete reviews.

Adding and deleting reviews also affects the total average rating for the course.

### User Profile features:

The user profile features contains all the features an user will have for their own profile, this includes a profile picture, a description, their user display settings, the courses are taking or TA'ing if they are a Teaching Assistant or Professor. Lastly, the comments an user has made is also displayed. Additionally, the javascript for this page is complete with placeholders because a database will be used in phase 2 and the placeholder is hardcoded. The javascript elements in the course table and the comment list are interactable. Note: parts of the page have been inspired by, utilized and adapted a template that has been credited in the file itself.

There is also a default view where you would be viewing another user's profile or viewing an account while you're not logged in, none of the javascript is interactable and its just information being displayed. It is important to note that is currently not accessible as it requires there to be multiple users which we do not have implemented in phase 1 due to the pages being dynamically generated depending on user information. It needs to be opened seperately if needed to be viewed

### Admin Profile features:

The admin profile features contains all the features an admin profile will need to moderate. This includes user lists and course lists alongside their rating, this allows admins to easily add/remove/access course pages and easily remove/access user pages as they are not able to add users, the users are required to do that themselves and a database will be used in phase 2 to automatically store and generate the tables required so admins can easily complete their tasks. Note: parts of the page have been inspired by, utilized and adapted a template that has been credited in the file itself.

## Slight Note:

At our footer, we haven't made an 'About Us' page and we will do it in Phase 2.

## List of third-party libraries:

- Bootstrap
- Fontawesome
- Material-icons
- Jquery
- CDN Datables
- Axios
- Mongoose
- Body Parser
- Path
- Cookie Parser
- JWT
- Nikel
- Bcrypt

## Express Routes

The three user types we have implemented all have routes to index, profile, search, course page, users search and logging in and out. Additional routes have been added in for user and admin routers as they are the primary required routes. The routes listed above returns a html page that we have made. 

The Admin router has additional routes in order to fetch 100 courses (any more would require us to pay) from the nikel api and save it to our mongodb. There is a create method that lets users create a course and they will be appended to our db given the schema we have implemented. There is a get method that allows users to view all courses in the db. There is a method where we can view a select course's information as well as edit it. There is a delete route that allows admins to delete users from the database. Lastly, there are create, edit and delete routes for users themselves that stores and interacts with the db.

The User router has a call that builds a course user page with the route "/course/:id", there is a call that lets you view course info given a course id (get method). Additionally, there are also register and login routes that lets the user login and then sorts the user by its role and then redirects them to their appropriate viewing page. There is an all route that lets you view all users. There is a "/user/id/:id" route that also returns an html page given a user and its id. There is also a post route that lets you post a review.

