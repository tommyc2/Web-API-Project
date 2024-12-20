import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import movies from './movies';
import Movie from '../../api/movies/movieModel';

async function main() {
    if (process.env.NODE_ENV !== 'development') {
        console.log('This script is only for the development environment.');
        return;
    }
    await mongoose.connect(process.env.MONGO_DB);
    // Drop collections
    await Movie.collection.drop().catch(err => console.log('Movie collection not found'));
    await Movie.create(movies);
    console.log('Database initialised');
    console.log(`${movies.length} movies loaded`);
    await mongoose.disconnect();
}

main();