import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../../context/global';
import { BsTrash } from "react-icons/bs";
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
                            <input
                        type="text"
                        id="title" cols="30"
                        value={video.text}
                        onChange={()=>{}}
                    />
                            <p>{video.description}</p>
                            {/* <BsTrash className="icon" onClick={removeVideo} /> */}
                        </div>
                    </Link>
                })}
            </div>
        </div>
    )
}
export default Videos
