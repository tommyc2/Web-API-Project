import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const HomePage = () => {

    const {  data, error, isLoading, isError }  = useQuery('discover', getMovies)
    const getReleaseDate = (date) => { return new Date(date); };

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;

    // Redundant, but necessary to avoid app crashing.
    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    movies.sort( (movie1,movie2) => {
        return getReleaseDate(movie2.release_date) - getReleaseDate(movie1.release_date)
    });

    console.log("Movies sorted from latest to oldest")

    return (
        <PageTemplate
            title="Discover Movies"
            movies={movies}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie} />
            }}
        />
    );
};
export default HomePage;

