import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/global';
import VideoJS from '../VideoJS/VideoJS';
import videojs from 'video.js';
import Navbar from "../../../Navbar/Navbar";
import './VideoPlayer.css';
import { BsTrash } from "react-icons/bs";

import 'videojs-contrib-quality-levels';

function VideoPlayer() {
    const { id } = useParams();
    const { videos } = useGlobalContext();
    const video = videos.find((vid) => {
        return vid._id === id;
    });
    const textareaRef = useRef(null);
    const [text, setText] = useState({ text: '' });
    const [updateUI, setUpdateUI] = useState(false); 

    useEffect(() => {
        if (video) {
          setText({ text: video.text });
        }
      }, [video,updateUI]);

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
    const RemoveVideo = () => {
        const confirmed = window.confirm('Are you sure you want to delete the video?');
        if (confirmed) {
          axios
            .delete(`http://localhost:3000/api/delete/${id}`)
            .then((res) => {
              console.log(res);
              setUpdateUI((prevState) => !prevState);
            })
            .catch((error) => {
              console.error("Error deleting video:", error);
            });
        }
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
        <div >
            <Navbar />
            <div className="container mt-3 play">
                                <div className="row">
                                    <div className="col-8">
                                <div className="embed-responsive embed-responsive-16by9 mb-4" ref={videoConRef}>
                                    <VideoJS options={videoOptions} onReady={handlePlayerReady} />
                                </div>
                                    </div>
                                    <div className="col-4">
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
                                <div className="text-center button ">
                                    <button className="btn btn-primary" onClick={modificationHandler}>
                                        Update
                                    </button>
                                    <BsTrash className="icon" onClick={RemoveVideo} />
                                </div>
                                <div class="col-6" className="bottons">
                <div className="back">
                  <Link to={'/user/videos/'}><i className="fas fa-arrow-left"></i>Back to Videos</Link>
                </div>
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;
