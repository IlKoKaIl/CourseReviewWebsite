// global array
const courseList = [];

class Course {
  constructor(code, name, department, level) {
    this.code = code;
    this.name = name;
    this.department = department;
    this.level = level;
    this.rating = null;
  }
}

// Adding default courses into list
courseList.push(
  new Course("CSC309", "Programming on the Web", "Computer Science", "300")
);
courseList.push(
  new Course(
    "MAT102",
    "Introduction to Proofs	",
    "Mathematical and Computational Sciences",
    "100"
  )
);
courseList.push(
  new Course("ECO101H1", "Principles of Microeconomics", "	Economics", "100")
);
courseList.push(
  new Course("PHL245H1", "Modern Symbolic Logic", "	Philosophy", "200")
);
// End of adding courses

/* Selecting required DOM form elements */
const courseAddForm = document.querySelector("#courseAddForm");

/* courseTable element */
const courseTable = document.querySelector("#courseTable");

/* Event listenders for button submit and click */
courseAddForm.addEventListener("submit", addNewCourseToCourseList);

function addNewCourseToCourseList(e) {
  e.preventDefault();

  // Add course details
  var newCourseCode = document.querySelector("#newCourseCode").value;
  var newCourseName = document.querySelector("#newCourseName").value;
  var newCourseDepartment = document.querySelector(
    "#newCourseDepartment"
  ).value;
  var newCourseLevel = document.querySelector("#newCourseLevel").value;

  // Add course to list
  var newCourse = new Course(
    newCourseCode,
    newCourseName,
    newCourseDepartment,
    newCourseLevel
  );
  courseList.push(newCourse);

  //Call the function that will add course to DOM
  addCourseToCourseTable(newCourse);
}

function addCourseToCourseTable(course) {
  var courseRow = courseTable.insertRow();

  // Create cells
  const courseCode = courseRow.insertCell();
  const courseName = courseRow.insertCell();
  const courseDepartment = courseRow.insertCell();
  const courseLevel = courseRow.insertCell();
  const courseRating = courseRow.insertCell();

  //Create Info
  const courseCodeInfo = document.createTextNode(course.code);
  const courseNameInfo = document.createTextNode(course.name);
  const courseDepartmentInfo = document.createTextNode(course.department);
  const courseLevelInfo = document.createTextNode(course.level);
  const courseRatingInfo = document.createTextNode(course.rating);

  // Enter Info
  //   courseCode.appendChild(courseCodeInfo);
  //   courseName.appendChild(courseNameInfo);
  //   courseDepartment.appendChild(courseDepartmentInfo);
  //   courseLevel.appendChild(courseLevelInfo);
  //   courseRating.appendChild(courseRatingInfo);

  courseTableBody = $("#courseTableBody tr:last");
  courseTableBody.after(
    '<tr><td><button class="btn btn-secondary btn-sm btn-delete" type="submit" style="background-color: red" id="deleteCourse">Delete</button></td> <td><a href="' +
      '">' +
      courseCodeInfo +
      "</a></td><td>" +
      courseNameInfo +
      "</td><td>" +
      courseDepartmentInfo +
      "/td><td>" +
      courseLevelInfo +
      "</td><td>" +
      courseRatingInfo +
      "</td></tr>"
  );
}
