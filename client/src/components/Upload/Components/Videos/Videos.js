import React from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/global';
import Navbar from "../../../Navbar/Navbar";
import "./Videos.css"
import 'bootstrap/dist/css/bootstrap.min.css'

function Videos() {
    const {videos} = useGlobalContext()

    return (
        <div className="videos">
            <Navbar/>
            <div className="videos-container">
                {videos.map((video) => {
                    return <Link key={video._id} to={`/videos/${video._id}`}>
                        <div  className="video">
                            <video src={video.videoUrl}></video>
                            <h4>{video.title}</h4>
                            <p>{video.description}</p>
                        </div>
                    </Link>
                })}
            </div>
        </div>
    )
}
export default Videos
