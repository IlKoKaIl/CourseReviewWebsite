//render review
function renderReview(review) {
  var review_html = `
    <div class="col">
    <div class="card h-100 course_card_green">
        <div class="card-header">
            <h5>
                <a href="../user/user_profile.html">${review.user_name}</a>
                <span class="course_sem">${review.semester}</span>
            </h5>
        </div>
        <div class="card-body">
            <h2 class="card-title">${review.course_name}</h2>
            <p class="card-text">${review.review}</p>
        </div>
        <div class="card-footer">
            <i class="material-icons">star</i>
            <i class="material-icons">star</i>
            <i class="material-icons">star</i>
            <i class="material-icons">star</i>
            <i class="material-icons">star</i>
        </div>
    </div>
    </div>
    `;
  return review_html;
}

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

const getCourse = async function (id) {
 const course = await axios.get(`http://localhost:3500/user/coursees/${id}`);
    return course
};


//course info


appendCourseInfo(id);




