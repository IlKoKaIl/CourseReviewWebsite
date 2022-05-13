//function get all courses form api
function getAllCourses() {
  //   http://localhost:3500/admin/all
  const url = "http://localhost:3500/admin/all";
  fetch(url)
    .then((response) => response.json())
    .then((courses) => {
      for (let i = 0; i < courses.length; i++) {
        //   code: courses[i].code,
        //   name: courses[i].name,
        //   description: courses[i].description,

        let id = courses[i]._id;
        console.log(id);

        let code = courses[i].code;
        console.log(code);
        let name = courses[i].name;
        console.log(name);
        let department = courses[i].department;
        console.log(department);
        let level = courses[i].level;
        console.log(level);
        let rating = courses[i].Rating;
        if (rating === undefined) {
          rating = 0;
        }
        console.log(rating);

        //create a table in html

        let tableRow = document.createElement("tr");
        //create a table data
        let tableData = document.createElement("td");

        //add data to table data
        //link table data to course page
        tableData.innerHTML = `<a href="/user/course/${id}">${code}</a>`;        
        tableRow.appendChild(tableData);

        tableData = document.createElement("td");

        tableData.innerHTML = name;
        tableRow.appendChild(tableData);

        tableData = document.createElement("td");
        tableData.innerHTML = department;
        tableRow.appendChild(tableData);

        tableData = document.createElement("td");
        tableData.innerHTML = level;
        tableRow.appendChild(tableData);

        tableData = document.createElement("td");
        tableData.innerHTML = rating;
        tableRow.appendChild(tableData);

        //add table row to table
        document.getElementById("table").appendChild(tableRow);
      }
    });
}
//get all courses

//get all courses and show on page

getAllCourses();
