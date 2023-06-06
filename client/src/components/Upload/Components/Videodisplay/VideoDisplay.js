import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import "./VideoDisplay.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function VideoDisplay() {
  const [videoData, setVideoData] = useState(null);
  const [textData, setTextData] = useState(null);
  const [initextData, setiniTextData] = useState("");
  const [transcription, setTranscription] = React.useState('');
  const [modification, setModification] = useState(false);


 const handleTextChange = name => e => {
  if(name === 'transcription'){
          setTranscription(e.target.value)
}
}
const textareaRef = useRef(null);
const [text, setText] = useState({ text: '' }); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/videoandtext/`+localStorage.getItem('user'));
        
      console.log(response.data.text) 
      setVideoData(response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
    


   
  }, []); // Empty dependency array to run the effect only once
  
  const modificationHandler = () => {
    const textareaElement = textareaRef.current; 
    if (textareaElement) {
      const textareaValue = textareaElement.value; 
      console.log(textareaValue); 
  axios
  .post('http://localhost:3000/api/videotextupdate', { id , text: textareaValue })
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
    
  }
  
  return (
    <div className="mycontainer">
     {videoData &&(
        <div>
          <div className="row">
            <div className="eidt-video">
          <div className="video">
             <video  className="VideoPlayer" src={`http://localhost:3000/api/readVideo/`+videoData.video.filename} controls />
          </div>
          <form >  
           <textarea
                        ref={textareaRef}
                        type="text"
                        id="transcription" cols="30" rows="22"
                        value={videoData.video.text}
                        onChange={handleTextChange('transcription')}
                    >
                    </textarea>
                    
                    <div><button onClick={modificationHandler}>
                      {!modification ? "modify" : "send"}
                    </button>
                    </div>
          </form>
          {/* <textarea
              id="description" cols="30" rows="23"value={videoData.data}  >
          </textarea> */}
          </div>
        </div>
           </div>
      )}
     
    </div>
    
  );
}

export default VideoDisplay;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function VideoDisplay() {
//   const [videoData, setVideoData] = useState([]);

//   useEffect(() => {
    
//    // Fetch the video data based on the videoId
//    // Replace this with your actual API endpoint or logic
//     axios.get(`http://localhost:3000/api/videoandtext`, {iduser: localStorage.getItem('user')})
//       .then(response => setVideoData(response.data))
//       .catch(error => console.error(error));

//   }, []);


//   return (

//     <div>
//         {/* <video width="750" height="500" controls >
//       <source src="..Videos/video1.mp4" type="video/mp4"/>
//      </video> */}
//       <h2>Video Display</h2>
//       <p>Description: {videoData[0].video.videoUrl}</p>
//       {/* Render the video player or other video details */}
//     </div>
//   );
// }

// export default VideoDisplay;

// const docs = async () =>{
    //   {uri: ""}
    //   }
    // const fetchDataText = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:3000/api/readText/`+ videoData.text.filename);
    //     console.log(videoData.text.filename)
    //   console.log(response.data) 
    //   setVideoDataText(response.data);
    //   } catch (error) {
    //     console.log('Error fetching data:', error);
    //   }
    // };
    // fetchDataText();

     {/* <div><h2>Text Details:</h2>
          <p>Title: {videoData.text.title}</p>
          <p>Description: {videoData.text.description}</p>
          <p>text:{videoData.data}</p>
       </div> */}

        {/* <div> {textData &&(<div className="preview" dangerouslySetInnerHTML={{ __html: textData.data}}></div>
      )}</div> */}

                {/* <div class="col col-md-6" className="preview" dangerouslySetInnerHTML={{ __html: value}}></div>  */}

                {/* <div className="editor">
                <ReactQuill 
                 theme="snow"
                 value={videoData.data}
                 onChange={setValue}
                 className="editor-input"
                // modules={modules}
                />
             </div> */}