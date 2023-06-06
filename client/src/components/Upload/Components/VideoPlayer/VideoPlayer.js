import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/global';
import VideoJS from '../VideoJS/VideoJS';
import videojs from 'video.js';
import Navbar from "../../../Navbar/Navbar";
import './VideoPlayer.css';

import 'videojs-contrib-quality-levels';

function VideoPlayer() {
    const { id } = useParams();
    const { videos } = useGlobalContext();
    const video = videos.find((vid) => {
        return vid._id === id;
    });
    const textareaRef = useRef(null);
    const [text, setText] = useState({ text: '' });

    useEffect(() => {
        if (video) {
            setText({ text: video.text });
        }
    }, [video]);

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
        sources: [
            {
                src: video?.videoUrl,
                type: 'video/mp4',
            },
        ],
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
            },
        },
    };

    const modificationHandler = () => {
        const textareaElement = textareaRef.current;
        if (textareaElement) {
            const textareaValue = textareaElement.value;
            console.log(textareaValue);
            axios
                .post('http://localhost:3000/api/videotextupdate', { id, text: textareaValue })
                .then((response) => {
                    // Handle the response from the server
                    console.log(response.data); // Response from the server
                    // Perform additional actions as needed
                })
                .catch((error) => {
                    // Handle errors
                    console.error(error);
                    // Perform error handling as needed
                });
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                <div className="embed-responsive embed-responsive-16by9 mb-4" ref={videoConRef}>
                                    <VideoJS options={videoOptions} onReady={handlePlayerReady} />
                                </div>
                                    </div>
                                    <div className="col-6">
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        ref={textareaRef}
                                        id="transcription"
                                        rows="15"
                                        value={text.text}
                                        onChange={(e) => {
                                            setText(e.target.value);
                                        }}
                                    ></textarea>
                                </div>
                                    </div>
                                </div>
                                <div className="text-center mt-2 ms-5">
                                    <button className="btn btn-primary" onClick={modificationHandler}>
                                        Update
                                    </button>
                                </div>

            </div>
        </>
    );
}

export default VideoPlayer;
