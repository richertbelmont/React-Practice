const API_KEY = "34a0ac7363d67e932b4a69b78f44799a";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async(page = 1) => {

    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page = ${page}`);
    const data = await response.json()
    return {
        results: data.results,
        totalPages: data.total_pages
    };
}

export const searchMovies = async(query) => {

    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}`
    );
    const data = await response.json()
    return data.results
}