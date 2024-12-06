import React from "react";
import { getRecommendedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { useParams } from 'react-router-dom';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const RecommendedMoviesPage = () => {

    const { id } = useParams();
    const getReleaseDate = (date) => { return new Date(date); };

    const { data, error, isLoading, isError } = useQuery(
        ["movie", { id: id }],
        getRecommendedMovies
    );

    if (isLoading) { return <Spinner /> }
    if (isError) { return <h1>{error.message}</h1> }

    const movies = data.results; // movie objects

    // Redundant, but necessary to avoid app crashing.
    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    movies.sort( (movie1,movie2) => {
        return getReleaseDate(movie2.release_date) - getReleaseDate(movie1.release_date)
    });
    
    console.log("Movies sorted from latest to oldest")
    

    return (
        <PageTemplate
            title="Recommended Movies"
            movies={movies}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie} />
            }}
        />
    );
};

export default RecommendedMoviesPage;

