// Api/TmdbApi.js

import {API_TOKEN} from "../Helpers/Token";

// Get films list from search
export function getFilmsFromTmdbApiWithSearchedText(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page;

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

// Get film's image from API
export function getImageFromApi(name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}

// Récupération du détail d'un film
export function getFilmDetailFromApi (id) {
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
        .then((response) => response.json())
        .catch((error) => console.error(error));
}