
import React from 'react'
import { useGlobalContext } from '../../context/global';
import Button from '../Button/Button';
import Navbar from "../../../Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import './Upload.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

function Upload() {
    const [video, setVideo] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [label, setLabel] = React.useState('Upload your video...');
    const [loading, setLoading] = React.useState(false);
    const [isUpload, setIsUpload] = React.useState(false);
    const [conversionComplete, setConversionComplete] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);

    const {getAllVideos} = useGlobalContext();
    const history = useNavigate();

    const handleTextChange = name => e => {
        if(name === 'title'){
            setTitle(e.target.value)
        }else{
            setDescription(e.target.value)
        }
    }

    const handleVideo = (e) => {
        setVideo(e.target.files[0])
        setLabel('Your Video: ' + e.target.files[0].name)
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);
      
        if (title) {
          const formData = new FormData();
          formData.append('title', e.target.title.value);
          formData.append('description', e.target.description.value);
          formData.append('video', e.target.video.files[0]);
          formData.append('iduser', localStorage.getItem('user'));
      
          try {
            const response = await axios.post('http://localhost:3000/api/upload', formData, {
              onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setUploadProgress(progress);
              },
            });
            // if (response.status === 200) {
            //     setConversionComplete(true);
            //     // Redirect to the video display page with the uploaded video ID
            //     history.push(`/video/${response.data.video._id}`);
            //   }
            console.log(response);
          } catch (error) {
            console.error(error);
          }
        } else {
          alert('Add Title');
        }
      
        setLoading(false);
        getAllVideos();
        setTitle('');
        setDescription('');
        setVideo(null);
        setLabel('Upload your video...');
        setUploadProgress(0);
      };
      

    return (
        <div>
            <Navbar/>
            <h2>Upload Video</h2>
            {/* { !loading? */}
            <form onSubmit={handleUpload} action="api/upload" method='POST' encType='multipart/form-data'>
                <div className="input-control">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder='Enter Title'
                        value={title}
                        onChange={handleTextChange('title')}
                    />
                </div>
                <div className="input-control">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        placeholder='Enter description here...'
                        id="description" cols="30" rows="6"
                        value={description}
                        onChange={handleTextChange('description')}
                    >
                    </textarea>
                </div>
                <div className="input-control upload-con">
                    <label htmlFor="video">Video Upload</label>
                    <div className="inner-input">
                        <label
                            className='inner-label'
                            htmlFor="video"
                            style={{color: video ? '#00b894' : 'rgb(74 74 74)'}}
                        >
                            {label}
                        </label>
                        <input
                            type="file"
                            name="video"
                            id="video"
                            accept="video/*"
                            //hidden
                            hidden
                            onChange={handleVideo}
                        />
                    </div>
                    <div className="upload-btn">
                        <Button
                            name="Upload"
                            icon={<i className="fas fa-upload"></i>}
                            bg={"#00b894"}
                            type="submit"
                            disabled={loading}
                        />
                    </div>
                    {uploadProgress && (
                    <div className="progress-bar">
                       <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
                    </div>)}
                    

                </div>
            </form>
            {/* <div className='bg-white'> */}
              {/* <VideoPlayer/> */}


            {/* </div> */}

        </div>
    )
}

export default Upload

// import React from 'react';
// import { useGlobalContext } from '../../context/global';
// import Button from '../Button/Button';
// import Navbar from "../../../Navbar/Navbar";
// import axios from 'axios';
// import './Upload.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Upload() {
//   const [video, setVideo] = React.useState(null);
//   const [title, setTitle] = React.useState('');
//   const [description, setDescription] = React.useState('');
//   const [label, setLabel] = React.useState('Upload your video...');
//   const [loading, setLoading] = React.useState(false);
//   const [uploadProgress, setProgress] = React.useState(0);
//   const [conversionComplete, setConversionComplete] = React.useState(false);

//   const {getAllVideos} = useGlobalContext();

//   const handleTextChange = name => e => {
//     if(name === 'title'){
//       setTitle(e.target.value)
//     } else {
//       setDescription(e.target.value)
//     }
//   }

//   const handleVideo = (e) => {
//     setVideo(e.target.files[0])
//     setLabel('Your Video: ' + e.target.files[0].name)
//   }

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if(title){
//       const formData = new FormData();
//       formData.append('title', e.target.title.value)
//       formData.append('description', e.target.description.value)
//       formData.append('video', e.target.video.files[0]);

//       try {
//         const response = await axios.post('http://localhost:3000/api/upload', {
//           method: 'POST',
//           body: formData,
//           onUploadProgress: (progressEvent) => {
//             const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
//             setProgress(progress);
//           },
//         })

//         if (response.status === 200) {
//           setConversionComplete(true);
//         }

//         console.log(response)
//       } catch (error) {
//         console.error(error)
//       }
//     } else {
//       alert('Add Title')
//     }

//     setLoading(false);
//     getAllVideos();
//     setTitle('');
//     setDescription('');
//     setVideo(null);
//     setLabel('Upload your video...');
//     setProgress(0);
//   }

//   return (
//     <div>
//       <Navbar/>
//       <h2>Upload Video</h2>
//       <form onSubmit={handleUpload} action="api/upload" method='POST' encType='multipart/form-data'>
//         <div className="input-control">
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             name="title"
//             id="title"
//             placeholder='Enter Title'
//             value={title}
//             onChange={handleTextChange('title')}
//           />
//         </div>
//         <div className="input-control">
//           <label htmlFor="description">Description</label>
//           <textarea
//             name="description"
//             placeholder='Enter description here...'
//             id="description"
//             cols="30" rows="6"
//             value={description}
//             onChange={handleTextChange('description')}
//           ></textarea>
//         </div>
//         <div className="input-control upload-con">
//           <label htmlFor="video">Video Upload</label>
//           <div className="inner-input">
//             <label
//               className='inner-label'
//               htmlFor="video"
//               style={{color: video ? '#00b894' : 'rgb(74 74 74)'}}
//             >
//               {label}
//             </label>
//             <input
//               type="file"
//               name="video"
//               id="video"
//               accept="video/*"
//               hidden
//               onChange={handleVideo}
//             />
//           </div>
         
//           <div className="upload-btn">
//             <Button
//               name="Upload"
//               icon={<i className="fas fa-upload"></i>}
//               bg="#00b894"
//               type="submit"
//               disabled={loading}
//             />
//           </div>
//         </div>
//          {conversionComplete && ( 
//             <div className="progress-bar">
//               <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
//             </div>
//            )} 
//       </form>
//     </div>
//   );
// }

// export default Upload;
