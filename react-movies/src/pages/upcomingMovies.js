import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToWatchListIcon from "../components/cardIcons/addToWatchList";

const UpcomingMoviesPage = () => {

    const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)
    const getReleaseDate = (date) => { return new Date(date); };

    if (isLoading) { return <Spinner /> }
    if (isError) { return <h1>{error.message}</h1> }

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
            title="Upcoming Movies"
            movies={movies}
            action={(movie) => {
                return (
                <>
                    <AddToFavoritesIcon movie={movie} />
                    <AddToWatchListIcon movie={movie}/>
                </>
                );
            }}
        />
    );
};
export default UpcomingMoviesPage;

