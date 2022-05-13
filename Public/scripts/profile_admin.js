function deleteUserRow(id){
    const table_body = document.querySelectorAll("#userBodyTable")[0].childNodes[3];
    table_body.deleteRow(id - 1);
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

function toggle2(id){
    rating = id;
    const stars = document.querySelectorAll('#sstar');
    for (var i = 0; i < 5; i++){
        if (i < rating){
            stars[i].innerText = 'star';
        }
        else{
            stars[i].innerText = 'star_border';
        }
    }
}

// THERE WILL BE FUNCTIONS THAT LEAD TO AND INTERACT WITH A DATABASE AND SERVER CALLS FOR NOW THEY ARE HARDCODED WITH PLACEHOLDERS
