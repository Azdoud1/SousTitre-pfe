import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/global';
import Navbar from '../../../Navbar/Navbar';
import './Videos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Videos() {
    const { videos } = useGlobalContext();

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    {videos.map((video) => (
                        <div key={video._id} className="col-md-4 mb-4">
                            <Link to={`/videos/${video._id}`} className="text-decoration-none">
                                <div className="card">
                                    <video src={video.videoUrl} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{video.title}</h5>
                                        <p className="card-text">{video.description}</p>
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
