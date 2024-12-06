import React from "react";
import { getSimilarMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { useParams } from 'react-router-dom';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const SimilarMoviesPage = () => {

    const { id } = useParams();
    const getReleaseDate = (date) => { return new Date(date); };

    const { data, error, isLoading, isError } = useQuery(
        ["movie", { id: id }],
        getSimilarMovies
    );

    if (isLoading) { return <Spinner /> }
    if (isError) { return <h1>{error.message}</h1> }

    const similarMovies = data.results; // movie objects

    // Redundant, but necessary to avoid app crashing.
    const favorites = similarMovies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    similarMovies.sort( (movie1,movie2) => {
        return getReleaseDate(movie2.release_date) - getReleaseDate(movie1.release_date)
    });

    console.log("Movies sorted from latest to oldest")

    return (
        <PageTemplate
            title="Similar Movies"
            movies={similarMovies}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie} />
            }}
        />
    );
};

export default SimilarMoviesPage;

