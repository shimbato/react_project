import { Container, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import star from "../icon/star.svg";
import { MovieCards } from "../components/MovieCards";
import './MoviePage.css'

export function MoviePage() {
    const [movie, setMovie] = useState();
    const [similar, setSimilar] = useState();
    const { movieId } = useParams();
    console.log(movieId);

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU`
        )
            .then((res) => res.json())
            .then(setMovie);
    }, [movieId]);

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU`
        )
            .then((res) => res.json())
            .then((movie) => setSimilar(movie.results));
    }, [movieId]);

    if (!movie) {
        return "Loading...";
    }

    return (

        <div
            className="movie_wrapper"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
            }}
        >
            <Container style={{ margin: '50px 0 0 20px' }}>
                <div className="movie_wrapper__genre">
                    {movie.genres.map((genre) => (
                        <div className="movie_wrapper__shadow">{genre.name}</div>
                    ))}
                </div>
                <div className="movie_card__stars" style={{ paddingTop: '17px' }}>
                    {movie.vote_average >= 0 && <img src={star} alt="" />}
                    {movie.vote_average >= 2 && <img src={star} alt="" />}
                    {movie.vote_average >= 4 && <img src={star} alt="" />}
                    {movie.vote_average >= 6 && <img src={star} alt="" />}
                    {movie.vote_average >= 8 && <img src={star} alt="" />}
                </div>
                <h1 className="movie_wrapper__titles">{movie.title}</h1>
                <p className="movie_wrapper__titles">{movie.overview}</p>
            </Container>
            <div className="similar_movie__card">
                <Container maxWidth='xl' style={{ color: "white" }}>
                    <h2>Similar movies </h2>
                    <Grid container spacing={2} style={{
                        width: '1524px',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        position: 'absolute',
                        zIndex: '1'
                    }}>
                        {similar.slice(0, 5).map((movie) => (
                            <Grid item xs={12 / 5} key={movie.id}>
                                <MovieCards movie={movie} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
        </div>
    );
}
