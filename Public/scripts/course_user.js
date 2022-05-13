let total_reviews = 6;
let rating = 5;
let total_score = 23;

function new_review(){
    const title = document.querySelector('#review_title').value
    const desc = document.querySelector('#review_desc').value
    const session = document.querySelector('#review_session').value
    
    const section = document.querySelector('#reviews')

    const new_card = document.createElement('div')
    if (rating < 3){
        new_card.className = 'card h-100 course_card_red'
    }
    else if (rating == 3){
        new_card.className = 'card h-100'
    }
    else{
        new_card.className = 'card h-100 course_card_green'
    }
    const new_header = document.createElement('div')
    new_header.className = 'card-header'
    const header_content = document.createElement('h5')
    const header_user = document.createElement('a')
    header_user.setAttribute('href', '../user/user_profile.html')
    header_user.appendChild(document.createTextNode('Mihir Koka'))
    const header_sem = document.createElement('span')
    header_sem.className = 'course_sem'
    header_sem.appendChild(document.createTextNode(session))
    header_content.appendChild(header_user)
    header_content.appendChild(header_sem)
    new_header.appendChild(header_content)

    // add body
    const card_body = document.createElement('div')
    card_body.className = 'card-body'
    const review_title = document.createElement('h2')
    review_title.className = 'card-title'
    review_title.appendChild(document.createTextNode(title))
    const review_desc = document.createElement('p')
    review_desc.className = 'card-text'
    review_desc.appendChild(document.createTextNode(desc))
    card_body.appendChild(review_title)
    card_body.appendChild(review_desc)

    // add footer
    const card_footer = document.createElement('div')
    card_footer.className = 'card-footer'
    const stars_div = document.createElement('div')
    for (var i = 0; i < 5; i++){
        const star_i = document.createElement('i')
        star_i.className = "material-icons"
        if (i < rating){
            star_i.appendChild(document.createTextNode('star'))
        }
        else{
            star_i.appendChild(document.createTextNode('star_border'))
        }
        stars_div.appendChild(star_i)
    }
    card_footer.appendChild(stars_div)

    new_card.appendChild(new_header)
    new_card.appendChild(card_body)
    new_card.appendChild(card_footer)

    if (total_reviews % 3 == 0){
        const new_review = document.createElement('div')
        new_review.className = "row py-3"
        const new_col = document.createElement('div')
        new_col.className = 'col'
        new_col.appendChild(new_card)
        new_review.appendChild(new_col)
        const new_col2 = document.createElement('div')
        new_col2.className = 'col'
        new_review.appendChild(new_col2)
        const new_col3 = document.createElement('div')
        new_col3.className = 'col'
        new_review.appendChild(new_col3)
        section.appendChild(new_review)
    }
    else{
        const review_row = section.lastElementChild
        let curr_col = review_row.firstChild
        const index = total_reviews % 3
        for (var i = 0; i < index; i++){
            curr_col = curr_col.nextSibling
        }
        curr_col.appendChild(new_card)

    }

    total_reviews += 1;
    total_score += rating;
    update_course_rating();

}

function toggle(id){
    rating = id;
    const stars = document.querySelectorAll('#rstar');
    for (var i = 0; i < 5; i++){
        if (i < rating){
            stars[i].innerText = 'star';
        }
        else{
            stars[i].innerText = 'star_border';
        }
    }
}

function update_course_rating(){
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