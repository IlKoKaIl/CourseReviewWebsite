// get user profile by id

let user_id = req.user_id;

const user_info = (user_id) => {
  //fetch
  fetch(`http://localhost:3000/user/${user_id}`)
    .then((response) => response.json())
    .then((user) => {
      console.log(user);

      //find html element by id
      let user_name = document.getElementById("user_name");
      let user_email = document.getElementById("user_email");
      let user_description = document.getElementById("user_description");

      //add data to table data
      user_name.innerHTML = user.FirstName;
      user_email.innerHTML = user.Email;
      user_description.innerHTML = user.Description;
    });
};

user_info(user_id);
