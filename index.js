var videoSwiper = new Swiper('.swiper-container', {
    // Configuration options for your video swiper
    slidesPerView: 1,  // Number of slides displayed in the viewport
    spaceBetween: 30, // Space between slides
    loop: true,       // Enable loop mode
    autoplay: {
        delay: 35000,  // Delay between slides in milliseconds
    },
});


function checkuser(){
    var name = sessionStorage.getItem('current');
    if(name !=undefined ){
        $("#namedisplay").text(name);
    }

}
function login() {
    var datas = {username:$("#username").val(),password:$("#password").val()};
    $.ajax({
        url: "login.php",
        method: "POST",
        data: datas,
        success: function (response) {
            if(response == 1){
            sessionStorage.setItem('current',datas.username);
            window.location.href = `index.html`;

            }else{
                alert('Incorrect Username or Password');
            }
            

        },
        error: function (err) {
            console.error(err);
        }
    });
}



//logout session

function logoutbtn(){
    sessionStorage.removeItem('current');
    window.location.href = '../index.html';
}

const API_KEY = `d908fe19009fc0bf22af598d48a23c29`;
const IMGKEY = `https://image.tmdb.org/t/p/w1280`;

let container = document.getElementById('containerofalldiv');
let searchbutton = document.getElementById('searchbutton');
outerdiv();

//suru ko div ko lagi hoo
async function outerdiv() {
    let card = document.querySelectorAll('.cardmain');
    let trendingmovies = await trending_movies();
    console.log(trendingmovies);

    card.forEach((cards, index) => {

        if (index < trendingmovies.length) {
            const movie = trendingmovies[index];
            cards.style.backgroundImage = `url(${IMGKEY + movie.poster_path})`;
            cards.innerHTML = `<h4>${movie.title}</h4> <button class="IMD1">IMDB</button><i class="fa-regular fa-star" style="color: #ffffff; margin-right: 4px;"></i><p class="rate1">${movie.vote_average}</p>`
            cards.addEventListener('click', () => reviewshow(movie))
        }

    });
}


//trending ma click gardaa yoo
let trendingdivmovies = document.getElementById('trending')
trendingdivmovies.addEventListener('click', async function () {
    container.innerHTML = '';
    const data = await trending_movies();


    let cardiv = document.createElement('div');
    cardiv.classList.add('carddiv');
    container.appendChild(cardiv);

    data.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.backgroundImage = `url(${IMGKEY + movie.poster_path})`;
        card.innerHTML = `
            <h4>${movie.title}</h4>
            <button class="IMD1">IMDB</button>
            <i class="fa-regular fa-star" style="color: #ffffff; margin-right: 4px;"></i>
            <p class="rate1">${movie.vote_average}</p>
        `;
        cardiv.appendChild(card);

        card.addEventListener('click', () => reviewshow(movie));
    });
})


//series search garda yoo
searchbutton.addEventListener('click', async function () {
    container.innerHTML = '';
    const searchValue = document.getElementById('input').value;
    const data = await series(searchValue);
    console.log(data)


    let cardiv = document.createElement('div');
    cardiv.classList.add('carddiv');
    container.appendChild(cardiv);

    data.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.backgroundImage = `url(${IMGKEY + movie.poster_path})`;
        card.innerHTML = `
            <h4>${movie.name}</h4>
            <button class="IMD1">IMDB</button>
            <i class="fa-regular fa-star" style="color: #ffffff; margin-right: 4px;"></i>
            <p class="rate1">${movie.vote_average}</p>
        `;
        cardiv.appendChild(card);

        card.addEventListener('click', () => seriesreview(movie));
    });

})
async function seriesreview(movie) {
    container.innerHTML = '';
    let reviewdiv = document.createElement('div');
    reviewdiv.classList.add('maindivreviewpart');
    container.appendChild(reviewdiv);
    reviewdiv.style.backgroundImage = `url(${IMGKEY + movie.backdrop_path})`;

    reviewdiv.innerHTML = `<div class="reviewpart">
    <h2>${movie.name}</h2>
    <p>${movie.overview}.</p>
    <p class="releasedate">Release Date:<span> ${movie.first_air_date}</span></p>
    <p class="releasedate">Country:<span> ${movie.origin_country}</span></p>
    <p class="releasedate">Language:<span> ${movie.original_language}</span></p>
    <button class="IMDreviewpart">IMDB</button>
    <i class="far fa-star" style="color: #ffffff; margin-right: 4px;"></i>
    <p class="ratereviewpart">${movie.vote_average}</p>
    <button id="Watch">Watch</button>
</div>`;

    let maincardreview = document.createElement('div');
    maincardreview.classList.add('carddivreviewpart');
    reviewdiv.appendChild(maincardreview);

    let cardreview = document.createElement('div');
    cardreview.classList.add('cardreviewpart');
    reviewdiv.appendChild(cardreview);
    cardreview.style.backgroundImage = `url(${IMGKEY + movie.poster_path})`;

    let btn = document.getElementById('Watch');
    btn.addEventListener('click', async function () {
        const videodata = await get_movie_trailer(movie.id)
        reviewdiv.innerHTML = `<div class="iframe-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${videodata}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <span class="close-button" onclick="closeVideo()">X</span>
     </div>`;

    });

}


//yaa bata top-rated movies ko palo
let rated = document.getElementById('Top');
rated.addEventListener('click', async function () {
    container.innerHTML = '';
    const data = await toprated();


    let cardiv = document.createElement('div');
    cardiv.classList.add('carddiv');
    container.appendChild(cardiv);

    data.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.backgroundImage = `url(${IMGKEY + movie.poster_path})`;
        card.innerHTML = `
            <h4>${movie.title}</h4>
            <button class="IMD1">IMDB</button>
            <i class="fa-regular fa-star" style="color: #ffffff; margin-right: 4px;"></i>
            <p class="rate1">${movie.vote_average}</p>
        `;
        cardiv.appendChild(card);

        card.addEventListener('click', () => reviewshow(movie));
    });
})








//search garda aauney movies div div banera aauneyy
searchbutton.addEventListener('click', clickedpartdiv)
async function clickedpartdiv() {

    container.innerHTML = '';

    const searchValue = document.getElementById('input').value;


    const data = await search_movie_get(searchValue);


    let cardiv = document.createElement('div');
    cardiv.classList.add('carddiv');
    container.appendChild(cardiv);

    data.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.backgroundImage = `url(${IMGKEY + movie.poster_path})`;
        card.innerHTML = `
            <h4>${movie.title}</h4>
            <button class="IMD1">IMDB</button>
            <i class="fa-regular fa-star" style="color: #ffffff; margin-right: 4px;"></i>
            <p class="rate1">${movie.vote_average}</p>
        `;
        cardiv.appendChild(card);

        card.addEventListener('click', () => reviewshow(movie));
    });
};




//yeni haru data fetching hooo

async function toprated() {
    let res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`);
    let respData = await res.json();
    return respData.results
}

async function series(data) {
    let res = await fetch(`https://api.themoviedb.org/3/search/tv?query=${data}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`);
    let respData = await res.json();
    return respData.results
}
async function trending_movies() {
    let res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${API_KEY}`);
    let respData = await res.json();
    return respData.results
}

async function search_movie_get(searchdata) {
    const resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchdata}`);
    const respdata = await resp.json();
    return respdata.results;
}

async function get_movie_trailer(id) {
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`);
    const respData = await resp.json();
    return respData.results[0].key;
}

async function reviewshow(movie) {
    container.innerHTML = '';
    let reviewdiv = document.createElement('div');
    reviewdiv.classList.add('maindivreviewpart');
    container.appendChild(reviewdiv);
    reviewdiv.style.backgroundImage = `url(${IMGKEY + movie.backdrop_path})`;

    reviewdiv.innerHTML = `<div class="reviewpart">
    <h2>${movie.title}</h2>
    <p>${movie.overview}.</p>
    <p class="releasedate">Release Date:<span> ${movie.release_date}</span></p>
    <p class="releasedate">Language:<span> ${movie.original_language}</span></p>
    <button class="IMDreviewpart">IMDB</button>
    <i class="far fa-star" style="color: #ffffff; margin-right: 4px;"></i>
    <p class="ratereviewpart">${movie.vote_average}</p>
    <button id="Watch">Watch</button>
</div>`;

    let maincardreview = document.createElement('div');
    maincardreview.classList.add('carddivreviewpart');
    reviewdiv.appendChild(maincardreview);

    let cardreview = document.createElement('div');
    cardreview.classList.add('cardreviewpart');
    reviewdiv.appendChild(cardreview);
    cardreview.style.backgroundImage = `url(${IMGKEY + movie.poster_path})`;

    let btn = document.getElementById('Watch');
    btn.addEventListener('click', async function () {
        const videodata = await get_movie_trailer(movie.id)
        reviewdiv.innerHTML = `<div class="iframe-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${videodata}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <span class="close-button" onclick="closeVideo()">X</span>
     </div>`;

    });

}


