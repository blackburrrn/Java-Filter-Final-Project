const moviesWrapperElement = document.querySelector(".movies__wrapper");
let movies = [];

async function getMovies(filter) {
  const response = await fetch("https://www.omdbapi.com/?s=avengers&apikey=de67a2a7");
  const moviesData = await response.json();
  movies = moviesData.Search;

  renderMovies(filter);
}

function renderMovies(filter) {
  if (filter === "a_to_z") {
    movies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (filter === "z_to_a") {
    movies.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (filter === "new_to_old") {
    movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  } else if (filter === "old_to_new") {
    movies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  }

  moviesWrapperElement.innerHTML = movies.map((movie) => movieHTML(movie)).join("");
}

getMovies();

function movieHTML(movie) {
  return `<div class="movie__card">
    <img src="${movie.Poster}">
    <h3>${movie.Title}</h3>
    <p>${movie.Year}</p>
  </div>`;
}

function filterMovies(event) {
  renderMovies(event.target.value);
}

async function searchMovies() {
  const query = document.querySelector(".search__input").value.trim();
  if (!query) return;
  const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=de67a2a7`);
  const data = await response.json();
  if (data.Response === "True") {
    movies = data.Search;
    renderMovies();
  } else {
    moviesWrapperElement.innerHTML = `<p class="no__results">No results found for "${query}".</p>`;
  }
}

document.querySelector(".fa-magnifying-glass").addEventListener("click", searchMovies);
document.querySelector(".search__input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchMovies();
});