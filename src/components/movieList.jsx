import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import '../styles/movieList.css'
import Search from './Search';

function MovieList() {
    const [movies, setMovies] = useState([]);
    const myInput = useRef();
    
    function search(query) {
        const url = `https://api.tvmaze.com/search/shows?q=${query}`;
        axios.get(url).then(results => {
            setMovies(results.data);
        });

    };

    useEffect(() => myInput.current && myInput.current.focus());

    return (
        <div className="wrapper">
            <div className="container custom-container">
                <Search searchTerm = {search}/>
                <div className="card individual-card">
                    <ul>
                        {
                            movies.map(movie =>
                                <li className="movie" key={movie.show.id}>
                                    <div className="row">
                                        <div className="col-4 mt-3 mb-3">
                                            <img src={movie.show && movie.show.image && movie.show.image.original ? movie.show.image.original : ""} alt="" className="movie-img" />
                                        </div>
                                        <div className="col-8 mt-3 mb-3 text-left movie-detail">
                                            <h2>{movie.show.name}</h2>
                                            <div className="summary">
                                                <p>{movie && movie.show && movie.show.summary ? movie.show.summary.replace(/<[^>]+>/g, '') : "No summary yet"}</p>
                                            </div>
                                            <Button className="button">Show Episodes</Button>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default MovieList
