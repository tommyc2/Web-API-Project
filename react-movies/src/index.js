import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from "./pages/upcomingMovies";
import TrendingMoviesPage from "./pages/trendingMoviesPage";
import RecommendedMoviesPage from "./pages/recommendedMoviesPage"
import SimilarMoviesPage from "./pages/similarMoviesPage";
import AnimatedCursor from "react-animated-cursor"
import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react'
import AuthenticationCheck from "./components/auth";

const clerk_key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

if (!clerk_key) {
  throw new Error("Missing Publishable Key")
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <AnimatedCursor
            innerSize={15}
            outerSize={45}
            innerScale={1}
            outerScale={2}
            outerAlpha={0}
            hasBlendMode={true}
            innerStyle={{
                backgroundColor: 'black',
                zIndex: 9999
            }}
            outerStyle={{
                border: '3px solid black',
                zIndex: 9999
            }}
        />
            <SiteHeader />
            
            <MoviesContextProvider>
            <Routes>

                <Route path="/sign-in" element={<SignIn signUpUrl="/sign-up" afterSignInUrl="/" />} />
                <Route path="/sign-up" element={<SignUp signInUrl="/sign-in" afterSignUpUrl="/" />} />

                <Route element={<AuthenticationCheck />}>
                    <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
                    <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                    <Route path="/movies/:id" element={<MoviePage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                    <Route path="*" element={ <Navigate to="/" /> } />
                    <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
                    <Route path="/movies/trending" element={<TrendingMoviesPage />} />
                    <Route path="/movies/:id/recommendations" element={<RecommendedMoviesPage />} />
                    <Route path="/movies/:id/similar" element={<SimilarMoviesPage />} />
                </Route>

            </Routes>
            </MoviesContextProvider>
        </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>

    );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(
    <ClerkProvider
      publishableKey={clerk_key}
    >
        <App />
    </ClerkProvider>
);
