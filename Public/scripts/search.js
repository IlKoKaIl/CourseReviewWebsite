// var t = $("#courseTable").DataTable();

// function deleteButton(ele) {
//   var removeRow = $(ele).closest("tr");
//   t.row(removeRow).remove().draw(false);
// }
// $(document).ready(function () {
//   $('button[data-toggle="ajax-modal"]').click(function (event) {
//     $("#add").modal("show");
//   });

//   $("#button1").on("click", function () {
//     t.row
//       .add([
//         "<button onclick='deleteButton(this)'>Delete</button>",
//         $("#input1").val(),
//         $("#input2").val(),
//         $("#input3").val(),
//         $("#input4").val(),
//         $("#input5").val(),
//       ])
//       .draw(false);
//     $("#add").modal("toggle");
//   });
// });

//get all user and show on page
function getallUsers() {
  const url = "http://localhost:3500/user/all";

  fetch(url)
    .then((response) => response.json())
    .then((users) => {
      for (let i = 0; i < users.length; i++) {
        //   code: courses[i].code,
        //   name: courses[i].name,
        //   description: courses[i].description,

        let id = users[i]._id;
        console.log(id);

        let FirstName = users[i].FirstName;
        console.log(FirstName);
        let Email = users[i].Email;
        console.log(Email);
        // //create a table in html

        let deleteu = `<a href="/user/delete/${id}">Delete</a>`;

        let tableRow = document.createElement("tr");
        //create a table data
        let tableData = document.createElement("td");

        tableData.innerHTML = deleteu;
        tableRow.appendChild(tableData);

        tableData = document.createElement("td");

        tableData.innerHTML = id;
        tableRow.appendChild(tableData);

        tableData = document.createElement("td");
        tableData.innerHTML = `<a href="/user/user/id/${id}">${FirstName}</a>`;
        tableRow.appendChild(tableData);

        tableData = document.createElement("td");
        tableData.innerHTML = Email;
        tableRow.appendChild(tableData);

        //add table row to table
        document.getElementById("table").appendChild(tableRow);

      

        
      }
    });
}

getallUsers();
