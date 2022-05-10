import { useEffect, useState } from "react";
import { Grid, Pagination, TextField, Button } from '@mui/material';
import { MovieCards } from "./MovieCards";


function MovieGrid() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState('');

    ;
    const fetchMovies = (page = 1, query) => {
        fetch(
            `https://api.themoviedb.org/3/${query ? 'search' : 'discover'}/movie?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&query=${query}`
        )

            .then((res) => res.json())
            .then((res) => {
                setTotalPage(Math.min(res.total_pages, 500));
                setMovies(res.results);
                if (res.json === 'True') {
                    setMovies(res.search)
                }
                
            });
    };

    function handleSubmit(e) {
        e.preventDefault();
        fetchMovies(1, search);
       

    }

    function handleDelete(e) {
        e.preventDefault();
        fetchMovies(1);
    }


    
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchMovies(page);
    }, [page]);




    return (
        <div >
            <form
                onSubmit={handleSubmit}
                style={{ margin: '10px 0', dislay: 'flex', justifyContent: 'center' }}
            >

                <TextField
                    id="outlined-basic"
                    placeholder="Look for"
                    variant="outlined"
                    size='small'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button type='submit' variant='contained'>
                    Search
                </Button>
                <Button type='unSubmit' variant='outlined'
                    onClick={handleDelete} >
                    Clear
                </Button>
            </form>

            <Grid sx={{ margin: 'auto' }} container spacing={2}>
                {movies.map((movie) => (
                    <Grid item lg={12 / 5} key={movie.id}>
                        <MovieCards movie={movie} />
                    </Grid>
                ))}
            </Grid>

            {totalPage > 1 && (
                <div style={{ display: 'flex', margin: '20px, auto' }}>
                    <Pagination
                        style={{ margin: '0 auto' }}
                        count={totalPage}
                        page={page}
                        onChange={(event, page) => setPage(page)}
                        variant="outlined"
                        shape="rounded"
                        color="secondary"
                    />
                </div>
            )};
        </div>
    );
}

export default MovieGrid;