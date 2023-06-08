import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/global';
import Navbar from '../../../Navbar/Navbar';
import './Videos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Videos() {
    const { videos } = useGlobalContext();
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrer les vidéos en fonction du terme de recherche
    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <Navbar />
            <div className="container ">
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <div className="input-search">
                            <input
                                type="text"
                                placeholder="Search by title"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="form-control"
                            />
                        </div>

                    </div>
                    {filteredVideos.map((video) => (
                        <div key={video._id} className="col-md-4 mb-4">
                            <Link to={`/videos/${video._id}`} className="text-decoration-none">
                                <div className="card">
                                    <video src={video.videoUrl} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{video.title}</h5>
                                        <p className="card-text text-black ">{video.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Videos;
