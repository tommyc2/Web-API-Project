# Movies API

Name: Tommy Condon
Course: BSc Applied Computing Year 3 (IoT)

## Features.

- Authentication (Login/Signup & View Profile) using Clerk (uses combination of JSON Web Tokens & Sessions)
- Protected Routes using Clerk generated JWTs
- Favourite Movies
- Trending Movies
- Upcoming Movies
- Movie Genres
- Recommended Movies based on Movie ID
- Similar Movies based on Movie ID


## Setup requirements.

To run this app, do the following:

### 1. Clone the Repository
Clone the repository using the git link above
### 2. Setup environment (API Configuration + Frontend Setup)

Navigate to the other folder in the root of the repository, 'movies-api'

Create a .env file with the following (substitute your own keys into each variable).

```bash
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=your_mongo_uri
TMDB_KEY=your_tmdb_key
```
Note: Make sure you setup a MongoDB server (or use MongoDB Atlas). Create an account here if you haven't done so: https://www.mongodb.com/atlas. Copy the URI you receive from your cluster environment and paste it with into the 'MONGO_DB' variable with the password/username in the URI.

Install the necessary packages for the API and run the API:

```bash
npm install
npm run dev
```

Navigate into the 'react-movies' folder

```bash
cd ./react-movies/movies/
```

REACT_APP_TMDB_KEY: You will need to generate an API key from TMDB (https://www.themoviedb.org/?language=en-IE). This will be the 'REACT_APP_TMDB_KEY' value.

REACT_APP_CLERK_PUBLISHABLE_KEY: This is your Clerk publishable key. Go to https://clerk.com and signup for an account. Once you do that, go to dashboard -> configure -> API keys and use the 'publishable key' as the value in the .env file. From here, you can customise your login/signup portal whatever way you like.

```bash
REACT_APP_TMDB_KEY=your_tmdb_api_key
REACT_APP_CLERK_PUBLISHABLE_KEY=your_key
FAST_REFRESH=false
```
Note: All environment variables should start with 'REACT_APP_' as this is react application.

Now, Install the necessary packages and run the program:

```bash
npm install
npm start
```

## API Design

- /api/movies | GET | Gets a list of movies 
- /api/movies/{movieid} | GET | Gets a single movie 
- /api/movies/tmdb/upcoming - Gets upcoming movies list
- /api/movies/tmdb/trending - Gets trending movies list
- /api/movies/{movie_id}/tmdb/recommended-movies - Gets recommended movies
- /api/movies/{movie_id}/tmdb/similar-movies - Gets list of similar movies
- /api/movies/tmdb/genres - Filters movies based on genre(s)
- /api/movies/{movie_images}/tmdb/movie-images - Gets the movie images for the home page, upcoming and & trending page.


## Security and Authentication

For the security implementation, Clerk Authentication was used ([See Clerk Docs here](https://clerk.com/docs)). The following routes were protected in the app:

- /reviews/:id = Reviews for particular movie
- /movies/favourites = list of favourited movies
- /movies/:id = Movie page
- / = root (homepage)
- /movies/upcoming = Upcoming list of movies
- /movies/trending = trending movies
- /movies/:id/recommendations = recommended movies
- /movies/:id/similar = similar movies to the one clicked on

## Integrating with React App

The Web API was integrated with the React Front End App by redirecting the urls to the local server which the API runs on (localhost:8080). When the user visits one of the url outlined above, it forwards that request to the API which either forwards the request and header info to the TMDB API for up-to-date movies or stays and grabs the list of movies from the the moviesData folder. 

Ideally, this API could be run on a Raspberry Pi or AWS EC2 Instance. This would isolate the API to a separate server instead of being executed on the client's machine. 

## Independent learning (if relevant)

I learned how to integrate a third party authentication service using ProtectedRoutes, sessions and JWTs with a RESTful API.

For this assignment, Clerk Express/Node SDK could've been used to authenticate the user further. However, Clerk are currently moving away from Node to Express, so I avoided this route and kept it simple.
