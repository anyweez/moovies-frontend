
// Our public URL: https://moovies.surge.sh
// When the page loads, do some setup-related tasks.
window.addEventListener('load', function () {
    // 1. Get some random movies for the left side.
    // 2. Get the latest events from my friends.
    // 3. Make the 'new movies' button get movies.

    // Find the first <button> element on the page
    const newMoviesBtn = document.querySelector('button');
    newMoviesBtn.addEventListener('click', function () {
        // eventually: request new movies
        getNewMovies();
    });

    getNewMovies();
    getRatings();
});

function getNewMovies() {
    // fetch() is a function for getting data AFTER the page
    // has loaded. this technique is called AJAX.
    fetch('https://immense-fortress-67036.herokuapp.com/movies')
        .then(response => response.json())
        .then(function (movies) {
            // once we get the data...
            // delete the old movies
            const movieList = document.querySelector('.movie-list ul');
            movieList.innerHTML = ''; // get rid of all content

            // render it on the screen
            for (let i = 0; i < movies.length; i++) {
                // create the <li> and add in a bunch of content
                const item = document.createElement('li');
                item.innerHTML = `
                    <h3>${movies[i].title}</h3>
                    <div>
                        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                        <i class="fa fa-thumbs-down" aria-hidden="true"></i>
                    </div>
                    <p>Genre: ${movies[i].genres}</p>
                    <p>Released on ${movies[i].release_date}</p>
                `;

                // get the up button for this movie and add click event
                const upBtn = item.querySelector('.fa-thumbs-up');
                upBtn.addEventListener('click', function () {
                    const message = {
                        name: document.querySelector('#username').value,
                        liked: true,
                        movie: {
                            id: movies[i].id,
                        },
                    };

                    const req = new XMLHttpRequest();
                    req.open('POST', 'https://immense-fortress-67036.herokuapp.com/rating');
                    req.setRequestHeader('Content-type', 'application/json');
                    req.send(JSON.stringify(message));
                });
                // get the down button for this movie and add click event
                const downBtn = item.querySelector('.fa-thumbs-down');
                downBtn.addEventListener('click', function () {
                    const message = {
                        name: document.querySelector('#username').value,
                        liked: false,
                        movie: {
                            id: movies[i].id,
                        },
                    };

                    const req = new XMLHttpRequest();
                    req.open('POST', 'https://immense-fortress-67036.herokuapp.com/rating');
                    req.setRequestHeader('Content-type', 'application/json');
                    req.send(JSON.stringify(message));
                });

                movieList.appendChild(item);
            }
        });
}

function getRatings() {
    fetch('https://immense-fortress-67036.herokuapp.com/ratings')
        .then(response => response.json())
        .then(function (ratings) {
            const ratingList = document.querySelector('.user-events ul');

            for (let i = 0; i < ratings.length; i++) {
                const rating = document.createElement('li');
                if (ratings[i].liked) {
                    rating.textContent = `${ratings[i].name} liked ${ratings[i].movie.title}`;
                } else {
                    rating.textContent = `${ratings[i].name} disliked ${ratings[i].movie.title}`;
                }

                ratingList.appendChild(rating);
            }
        });
}

// 1. for loop changes
// 2. style changes
// 3. font awesome