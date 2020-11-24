import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BsStar } from 'react-icons/bs'

import '../styles/movieList.css'
import '../styles/movieDetail.css'

function MovieDetail({ match }) {
    const [showEpisodes, setEpisodes] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const url = `http://api.tvmaze.com/shows/${match.params.id}/episodes`;

    useEffect(() => {
        fetchEpisodes();
    }, [])

    const fetchEpisodes = async () => {
        axios.get(url).then(res => {
            setLoading(false);
            const episodes = res.data;
            console.log('Episodes--', episodes);
            setEpisodes(episodes);
            setError('');

        }).catch(error => {
            setLoading(false);
            setEpisodes([]);
            setError('Something went wrong, cannot load the episodes');
        })
    };
    return (
        <div className="detail-wrapper">
            <div className="custom-container">
                <div className="list-container">
                    <div className="row">
                        <div className="col-5" style={{ border: "1px solid black" }}>
                            <h2>Movie Detail</h2>
                        </div>
                        <div className='col-7'>
                            <ul className="movie-detail-ul">
                                {
                                    loading ? 'Loading ...' :
                                        showEpisodes.map(episodes =>
                                            <li key={episodes.id} style={{ background: "white !important" }}>
                                                <div className="row">
                                                    <div className="col-2 p-0" >
                                                        <div className="episode-number">
                                                            {episodes && episodes.number && episodes.number < 10 ? '0' + episodes.number : episodes.number}
                                                        </div>
                                                    </div>
                                                    <div className="col-10 p-0">
                                                        <p className="episode-name"><strong>{episodes.name}</strong></p>
                                                        <BsStar className="rating" />
                                                        <p className="episode-airdate">{episodes.airdate}</p>
                                                    </div>
                                                </div>
                                            </li>)
                                }
                                {error ? error : null}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default MovieDetail
