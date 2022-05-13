let total_reviews = 6;
let total_score = 23;

function update_title(){
    const title = document.querySelector('#title').value
    const courseTitle = document.querySelector('#courseTitle')
    courseTitle.innerText = title
}

function update_desc(){
    const desc = document.querySelector('#desc').value
    const courseDesc = document.querySelector('#courseDesc')
    courseDesc.innerText = desc
}

function delete_review(element){
    let review = element.lastElementChild; 
    const ratings = review.getElementsByClassName('material-icons')
    let rating = 0
    for (var i=0; i<5; i++){
        const star = ratings[i]
        if (star.innerText == 'star'){
            rating += 1
        }
    }
    total_score -= rating
    total_reviews -= 1
    element.removeChild(review)

    update_course_rating()
}

function update_course_rating(){
    console.log(total_score)
    console.log(total_reviews)
    const avg_rating = total_score / total_reviews;
    const star1 = document.querySelector('#courseStar1')
    const star2 = document.querySelector('#courseStar2')
    const star3 = document.querySelector('#courseStar3')
    const star4 = document.querySelector('#courseStar4')
    const star5 = document.querySelector('#courseStar5')
    star1.innerText = 'star'
    star2.innerText = 'star_border'
    star3.innerText = 'star_border'
    star4.innerText = 'star_border'
    star5.innerText = 'star_border'
    if (avg_rating >= 1.5){
        star2.innerText = 'star'
    }

    if (avg_rating >= 2.5){
        star3.innerText = 'star'
    }

    if (avg_rating >= 3.5){
        star4.innerText = 'star'
    }

    if (avg_rating >= 4.5){
        star5.innerText = 'star'
    }
}