import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid2";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import React, { useContext  } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Stack } from "@mui/material";


export default function MovieCard({ movie, action }) {

    const { favorites } = useContext(MoviesContext);

    if (favorites.find((id) => id === movie.id)) {
        movie.favorite = true;
    } else {
        movie.favorite = false
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    movie.favorite ? (
                        <Avatar sx={{ backgroundColor: 'red' }}>
                            <FavoriteIcon />
                        </Avatar>
                    ) : null
                }
                title={
                    <Typography variant="h5" component="p">
                        {movie.title}{" "}
                    </Typography>
                }
            />
            <CardMedia
                sx={{ height: 300 }}
                image={
                    movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : img
                }
            />
            <CardContent>
                <Grid container>
                    <Grid size={{xs: 6}}>
                        <Typography variant="h6" component="p">
                            <CalendarIcon fontSize="small" />
                            {movie.release_date}
                        </Typography>
                    </Grid>
                    <Grid size={{xs: 6}}>
                        <Typography variant="h6" component="p">
                            <StarRateIcon fontSize="small" />
                            {"  "} {movie.vote_average}{" "}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions disableSpacing>
                <Grid container spacing={2}>

                    <Grid size={12}>
                        {action(movie)}

                        <Link to={`/movies/${movie.id}`}>
                            <Button variant="outlined" color="primary">
                            More Info ...
                            </Button>
                        </Link>
                    </Grid>
                    
                    <Grid size={6}>
                        <Link to={`/movies/${movie.id}/recommendations`}>
                            <Button variant="contained" color="primary">
                                Recommended Movies
                            </Button>
                        </Link>
                    </Grid>

                    <Grid size={6}>
                        <Link to={`/movies/${movie.id}/similar`}>
                        <Button variant="contained" color="secondary">
                            Similar Movies
                        </Button>
                        </Link>
                    </Grid>

                </Grid>
            </CardActions>

        </Card>
    );
}