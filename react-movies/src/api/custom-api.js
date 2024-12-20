export const getMovies = () => {
    return fetch(
        `http://localhost:8080/api/movies/`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovie = (args) => {
    console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    console.log("Movie ID:", id)
    return fetch(
        `http://localhost:8080/api/movies/${id}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};


export const getUpcomingMovies = () => {
    return fetch(
        `http://localhost:8080/api/movies/tmdb/upcoming`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};


export const getTrendingMovies = () => {
    return fetch(
        `http://localhost:8080/api/movies/tmdb/trending`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};


export const getRecommendedMovies = (args) => {
    console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `http://localhost:8080/api/movies/${id}/tmdb/recommended-movies`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};


export const getSimilarMovies = (args) => {
    console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `http://localhost:8080/api/movies/${id}/tmdb/similar-movies`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getGenres = () => {
    return fetch(
        `http://localhost:8080/api/movies/tmdb/genres`
    ).then( (response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};


export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `http://localhost:8080/api/movies/${id}/tmdb/movie-images`
    ).then( (response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

// The only API fetch that is not pulling data from the custom web api from the labs
// Instead, it is fetching directly from TMDB API
// This is due to an issue I had with the map function (excerpt section)
export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};