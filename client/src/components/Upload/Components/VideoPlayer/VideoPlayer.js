import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import { useGlobalContext } from '../../context/global'
import VideoJS from '../VideoJS/VideoJS'
import videojs from 'video.js';
import Navbar from "../../../Navbar/Navbar";
import './VideoPlayer.css'

import 'videojs-contrib-quality-levels';

// const [textData, setTextData] = useState(null);


function VideoPlayer() {

    const {id} = useParams()
    const {videos} = useGlobalContext()
    const video = videos.find((vid)=> {
        return vid._id === id
    })
    //refs
    const videoConRef = useRef(null);
    const playerRef = React.useRef(null);


    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };

    //video Options
    const videoOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        alwaysShowControls: true,
        sources: [{
            src: video?.videoUrl,
            type: 'video/mp4'
        }],
        controlBar: {
            children: [
                'playToggle',
                'volumePanel',
                'progressControl',
                'currentTimeDisplay',
                'timeDivider',
                'durationDisplay',
                'pictureInPictureToggle',
                'qualitySelector',
                'fullscreenToggle',
            ],
            durationDisplay: {
                timeToShow: ['duration'],
                countDown: false,
            }
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/text/`+localStorage.getItem('user'));
            
          console.log(response.data) 
          setTextData(response.data);
          } catch (error) {
            console.log('Error fetching data:', error);
          }
        };
        fetchData();
    }, []);
    

    return (

        
<div>
            <div className="VideoPlayer" >
            <Navbar/>
            <div className="back">
                <Link to={'/user/videos/'}><i className="fas fa-arrow-left"></i>Back to Videos</Link>
            </div>
            <div className="video-container" ref={videoConRef}>
                <VideoJS options={videoOptions} onReady={handlePlayerReady} />
            </div>
            <div className="video-info">
                <h4>{video?.text}</h4>

            </div>
            </div>
</div>
        
    )
}


export default VideoPlayer
