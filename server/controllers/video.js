// const VideoSchema = require('../models/VideoModel');
// const TextSchema = require('../models/fichierstext');
// const ffmpeg = require('fluent-ffmpeg');
// const fs = require('fs');
// const path = require('path');
// const { spawn } = require('child_process');

// ffmpeg.setFfmpegPath("C:/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe");

// exports.addVideo = async (req, res) => {
//   const { title, description } = req.body;
//   const videoPath = req.file.path;
//   const videoExt = req.file.mimetype.split('/')[1];
//   const videoFileName = req.file.filename;

//   const audioFileName = 'audio_' + videoFileName.split('.')[0] + '.wav';
//   const audioPath = path.join(__dirname, '../public/audio', audioFileName);

//   try {
//     ffmpeg(videoPath)
//       .toFormat('wav')
//       .on('error', (err) => {
//         console.log(`Error converting video to audio: ${err}`);
//         res.status(500).json({
//           message: 'Error converting video to audio',
//           error: err
//         });
//       })
//       .on('end', async () => {
//         const video = new VideoSchema({
//           title,
//           description,
//           filename: videoFileName,
//           videoUrl: videoPath,
//           audioUrl: audioPath
//         });

//         // Save the video object to the database
//         await video.save();

//         // Split the audio into segments
//         const segmentDuration = 300; // Duration of each segment in seconds
//         const audioSegments = [];
//         const totalDuration = await getAudioDuration(audioPath);

//         for (let start = 0; start < totalDuration; start += segmentDuration) {
//           const segmentStartTime = start;
//           const segmentEndTime = Math.min(start + segmentDuration, totalDuration);

//           const segmentFileName = `audio_segment_${segmentStartTime}_${segmentEndTime}.wav`;
//           const segmentFilePath = path.join(__dirname, '../public/audio', segmentFileName);

//           ffmpeg(audioPath)
//             .setStartTime(segmentStartTime)
//             .setDuration(segmentEndTime - segmentStartTime)
//             .save(segmentFilePath);

//           audioSegments.push(segmentFilePath);
//         }

//         const transcriptions = []; // Array to store individual transcriptions

//         // Process each audio segment
//         for (const segmentPath of audioSegments) {
//           const pythonProcess = spawn('python', ['controllers/transcribe.py', segmentPath]);

//           pythonProcess.stdout.on('data', (data) => {
//             const transcribedText = data.toString().trim();
//             console.log(`Transcription: ${transcribedText}`);
//              transcriptions.push(transcribedText);
//           });

//           pythonProcess.stderr.on('data', (data) => {
//             console.error(`Error in transcription: ${data}`);
//           });

//           pythonProcess.on('close', () => {
//             // Combine transcriptions into a single text
//             const concatenatedText = transcriptions.join(' ');

//             // Save the text to a file
//             const textFileName = 'text_' + videoFileName.split('.')[0] + '.txt';
//             const textFilePath = path.join(__dirname, '../public/text', textFileName);
//             fs.writeFile(textFilePath, concatenatedText, async (err) => {
//               if (err) {
//                 console.error(`Error saving transcription: ${err}`);
//                 return res.status(500).json({
//                   message: 'Error saving transcription',
//                   error: err,
//                 });
                 
//               } 
              
//   // Create a new instance of the TextSchema model
//   const text = new TextSchema({
//     title,
//     description,
//     filename: textFileName,
//     textUrl: textFilePath,
//   });

//   try {
//     // Save the text object to the database
//     const savedText = await text.save();
//     console.log('Text saved successfully:', savedText);

//     // Send a success response
//     return res.status(200).json({
//       message: 'File text saved successfully',
//       text: savedText,
//     });
//   } catch (error) {
//     console.error('Error saving file text to the database:', error);
//     return res.status(500).json({
//       message: 'Error saving file text to the database',
//       error: error,
//     });
//   }

//               //else {
//               //   console.log('Transcription saved successfully');
//               //   return res.status(200).json({
//               //     message: 'Video and Audio Uploaded Successfully',
//               //     video,
//               //     transcriptionUrl: `text/${textFileName}`,
                 
//               //      // Provide the URL to access the saved transcription
//               //   });
                 
//               // }
//             });
//           });
//         }
//       })
//       .save(audioPath);
//   } catch (error) {
//     console.log(`Error saving video and audio: ${error}`);
//     res.status(400).json({
//       message: 'Video and Audio upload failed',
//       error
//     });
//   }
// };

// // Helper function to get the duration of an audio file using ffprobe
// function getAudioDuration(audioPath) {
//   return new Promise((resolve, reject) => {
//     ffmpeg.ffprobe(audioPath, (err, metadata) => {
//       if (err) {
//         reject(err);
//       } else {
//         const duration = metadata.format.duration;
//         resolve(parseFloat(duration));
//       }
//     });
//   });
// }

// const VideoSchema = require('../models/VideoModel');
// const TextSchema = require('../models/fichierstext');
// const ffmpeg = require('fluent-ffmpeg');
// const fs = require('fs');
// const path = require('path');
// const { spawn } = require('child_process');

// ffmpeg.setFfmpegPath("C:/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe");

// exports.addVideo = async (req, res) => {
//   const { title, description, iduser } = req.body;
//   const videoPath = req.file.path;
//   const videoExt = req.file.mimetype.split('/')[1];
//   const videoFileName = req.file.filename;
//   const audioFileName = 'audio_' + videoFileName.split('.')[0] + '.wav';
//   const audioPath = path.join(__dirname, '../public/audio', audioFileName);

//   try {
//     ffmpeg(videoPath)
//       .toFormat('wav')
//       .on('error', (err) => {
//         console.log(`Error converting video to audio: ${err}`);
//         res.status(500).json({
//           message: 'Error converting video to audio',
//           error: err
//         });
//       })
//       .on('end', async () => {
//         const video = new VideoSchema({
//           title,
//           description,
//           iduser,
//           filename: videoFileName,
//           videoUrl: videoPath,
//           audioUrl: audioPath
//         });

//         // Save the video object to the database
//        const res= await video.save();
       
//        console.log(res)
//        const videoUrl= res.videoUrl
//         // Spawn a child process to run the Python script for audio transcription
//           // Call the transcribe.py script with the audioPath as an argument
//   const pythonProcess = spawn('python', ['controllers/transcribe.py', audioPath]);

//   const transcriptions = []; // Array to store individual transcriptions

//   pythonProcess.stdout.on('data', (data) => {
//     const transcribedText = data.toString().trim();
//     console.log(`Transcription: ${transcribedText}`);
//     transcriptions.push(transcribedText);
//   });

//   pythonProcess.stderr.on('data', (data) => {
//     console.error(`Error in transcription: ${data}`);
//   });

//   pythonProcess.on('close', () => {
//     // Combine transcriptions into a single text
//     const concatenatedText = transcriptions.join(' ');

//     // Save the text to a file
//     const textFileName = 'text_' + videoFileName.split('.')[0] + '.txt';
//     const textFilePath = path.join(__dirname, '../public/text', textFileName);
//     fs.writeFile(textFilePath, concatenatedText, async (err, fileText) => {
//       if (err) {
//         console.error(`Error saving transcription: ${err}`);
//         res.status(500).json({
//           message: 'Error saving transcription',
//           error: err,
//         });
//       }  
//       const text = new TextSchema({
//         title,
//         description,
//         iduser,
//         filename: textFileName,
//         textUrl: textFilePath,
//         fileText: fileText,
//       });
  
      
//         // Save the text object to the database
//         const savedText = await text.save();
//         console.log('Text saved successfully:', savedText);
  
//         // Send a success response

//       // catch (error) {
//       //   console.error('Error saving file text to the database:', error);
//       //   return res.status(500).json({
//       //     message: 'Error saving file text to the database',
//       //     error: error,
//       //   });
    
//     });
//   });
// })
//       .save(audioPath);
     
//       // res.status(200).json({
//       //   message: 'success',
        
//       // }); 
//   } catch (error) {
//     console.log(`Error saving video and audio: ${error}`);
//     res.status(400).json({
//       message: 'Video and Audio upload failed',
//       error
//     });
//   }
// };

const VideoSchema = require('../models/VideoModel');
const TextSchema = require('../models/fichierstext');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

ffmpeg.setFfmpegPath("C:/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe");

exports.addVideo = async (req, res) => {
  const { title, description, iduser } = req.body;
  const videoPath = req.file.path;
  const videoExt = req.file.mimetype.split('/')[1];
  const videoFileName = req.file.filename;
  const audioFileName = 'audio_' + videoFileName.split('.')[0] + '.wav';
  const audioPath = path.join(__dirname, '../public/audio', audioFileName);

  try {
    ffmpeg(videoPath)
      .toFormat('wav')
      .on('error', (err) => {
        console.log(`Error converting video to audio: ${err}`);
        res.status(500).json({
          message: 'Error converting video to audio',
          error: err
        });
      })
      .on('end', async () => {
        // Save the video object to the database
        // const savedVideo = await video.save();
        // console.log(savedVideo);

        // Spawn a child process to run the Python script for audio transcription
        const pythonProcess = spawn('python', ['controllers/transcribe.py', audioPath]);

        const transcriptions = []; // Array to store individual transcriptions

        pythonProcess.stdout.on('data', (data) => {
          const transcribedText = data.toString().trim();
          console.log(`Transcription: ${transcribedText}`);
          transcriptions.push(transcribedText);
        });

        pythonProcess.stderr.on('data', (data) => {
          console.error(`Error in transcription: ${data}`);
        });

        pythonProcess.on('close', async () => {
          // Combine transcriptions into a single text
          const concatenatedText = transcriptions.join(' ');

          const video = new VideoSchema({
            title,
            description,
            iduser,
            filename: videoFileName,
            videoUrl: videoPath,
            audioUrl: audioPath,
            text: concatenatedText, // Assign the transcribed text to the 'text' field
          });

          // Save the text to a file
          const textFileName = 'text_' + videoFileName.split('.')[0] + '.txt';
          const textFilePath = path.join(__dirname, '../public/text', textFileName);
          fs.writeFile(textFilePath, concatenatedText, async (err, fileText) => {
            if (err) {
              console.error(`Error saving transcription: ${err}`);
              res.status(500).json({
                message: 'Error saving transcription',
                error: err,
              });
            } else {
              const text = new TextSchema({
                title,
                description,
                iduser,
                filename: textFileName,
                textUrl: textFilePath,
                fileText: fileText,
              });
          
              // Save the text object to the database
              const savedText = await text.save();
              console.log('Text saved successfully:', savedText);
          
              // Assign the text to the VideoSchema object
              video.text = concatenatedText;
          
              // Save the video object to the database
              const savedVideo = await video.save();
              console.log('Video saved successfully:', savedVideo);
          
              // Send a success response
              res.status(200).json({
                message: 'success',
                video: savedVideo
              });
            }
          });
          
        });
      })
      .save(audioPath);
  } catch (error) {
    console.log(`Error saving video and audio: ${error}`);
    res.status(400).json({
      message: 'Video and Audio upload failed',
      error
    });
  }
};

// Helper function to split text into phrases
function splitIntoPhrases(text, phraseLength) {
  const words = text.split(' ');
  const phrases = [];
  let currentPhrase = '';

  for (let i = 0; i < words.length; i++) {
    currentPhrase += words[i] + ' ';

    if ((i + 1) % phraseLength === 0 || i === words.length - 1) {
      phrases.push(currentPhrase.trim());
      currentPhrase = '';
    }
  }

  return phrases;
}

// Helper function to get the timestamp for a given phrase
function getTimestampForPhrase(text, phrase) {
  const startIndex = text.indexOf(phrase);
  const endIndex = startIndex + phrase.length;
  return { start: startIndex, end: endIndex };
}

exports.getFichierText = async (req, res) => {
  try {
      const text = await TextSchema.find({})
      res.status(200).json({
          text
      })
  } catch (error) {
      res.status(400).json({
          message: 'text fetch failed',
          error
      })
  }
}
exports.UpdateFichierText = async (req, res) => {
  const { iduser} = req.params;
  console.log(iduser)

  try {
    const text = await TextSchema.findOne({iduser}).sort({ _id: -1 }).limit(1);
    const textFilePath = `C:/Users/lenovo/Desktop/bureuu/SousTitre-Authentication-In-MERN/server/public/text/${text.filename}`; // Replace with the actual path to your text files
     

    fs.readFile(textFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading text file:', err);
        return res.status(500).json({ message: 'Error reading text file' });
      }  
      res.status(200).json({
        text,
        data
      })
    });
  } catch (error) {
      res.status(400).json({
          message: 'text fetch failed',
          error
      })
  }
}
exports.getVideo = async (req, res) => {
  try {
      const video = await VideoSchema.find({})
      res.status(200).json({
        video
      })
  } catch (error) {
      res.status(400).json({
          message: 'video fetch failed',
          error
      })
  }
}

exports.readVideo=async(req, res) =>{
    const { filename } = req.params;
    const videoPath = `C:/Users/lenovo/Desktop/bureuu/SousTitre-Authentication-In-MERN/server/public/videos/${filename}`; // Replace with the actual path to your video files

    res.sendFile(videoPath);
 
}
exports.readText =async(req, res) =>{
  const { filename } = req.params;
  const textFilePath = `C:/Users/lenovo/Desktop/bureuu/SousTitre-Authentication-In-MERN/server/public/text/${filename}`; // Replace with the actual path to your text files
  fs.readFile(textFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading text file:', err);
      return res.status(500).json({ message: 'Error reading text file' });
    }

    res.send(data);
  });
}
exports.getVideoAndtext=async(req, res) =>{
  const { iduser} = req.params;
  console.log(iduser)

  try{
    const video = await VideoSchema.findOne({iduser}).sort({ _id: -1 }).limit(1);
    const text = await TextSchema.findOne({iduser}).sort({ _id: -1 }).limit(1);
    const textFilePath = `C:/Users/lenovo/Desktop/bureuu/SousTitre-Authentication-In-MERN/server/public/text/${text.filename}`; // Replace with the actual path to your text files
     

    fs.readFile(textFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading text file:', err);
        return res.status(500).json({ message: 'Error reading text file' });
      }
      //res.send(data);
      res.status(200).json({
        video,
        text,
        data
      })
    });
    
  } catch (error) {
    res.status(400).json({
      message:'viddeo fetch failed',
      erroe
    })
  }
}


exports.getAllVideos = async (req, res) => {
    try {
        const videos = await VideoSchema.find({})
        res.status(200).json({
            videos
        })
    } catch (error) {
        res.status(400).json({
            message: 'Videos fetch failed',
            error
        })
    }
}

/*const VideoSchema = require('../models/VideoModel');
const ffmpeg = require('fluent-ffmpeg');
const deepspeech = require('deepspeech');
const fs = require('fs');

const path = require('path');
ffmpeg.setFfmpegPath("C:/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe");

exports.addVideo = async (req, res) => {
    const { title, description } = req.body;
    const videoPath = req.file.path;
    const videoExt = req.file.mimetype.split('/')[1];
    const videoFileName = req.file.filename;

    const audioFileName = 'audio_' + videoFileName.split('.')[0] + '.wav';
    const audioPath = path.join(__dirname, 'public/audio', audioFileName);
    const audioTextFileName = 'text_' + videoFileName.split('.')[0] + '.txt';
    const audioTextPath = path.join(__dirname, 'public/text', audioTextFileName);
  
    try {
        ffmpeg(videoPath)
            .toFormat('wav')
            .on('error', (err) => {
                console.log(`Error converting video to audio: ${err}`);
                res.status(500).json({
                    message: 'Error converting video to audio',
                    error: err
                });
            })
            .on('end', async () => {
              const audioBuffer = fs.readFileSync(audioPath);
              const audioLength = (audioBuffer.length / 2) * (1 / 16000);
              const audioData = new Int16Array(audioBuffer.buffer);
      
              const text = model.stt(audioData, 16000);
              fs.writeFileSync(audioTextPath, text);

                const video = new VideoSchema({
                    title,
                    description,
                    filename: videoFileName,
                    videoUrl: videoPath,
                    audioUrl: audioPath
                });

                await video.save();
                res.status(200).json({
                    message: 'Video and Audio Uploaded Succesfully',
                    video
                });
            })
            .save(audioPath);
    } catch (error) {
        console.log(`Error saving video and audio: ${error}`);
        res.status(400).json({
            message: 'Video and Audio upload failed',
            error
        });
    }
   
    // convert audio to text
const { spawn } = require('child_process');
const fs = require('fs');

async function transcribeAudio(audioPath) {
  const pythonScript = path.join(__dirname, 'transcribe.py');
  const pythonArgs = [audioPath,audioFileName];
  const pythonProcess = spawn('python', [pythonScript, ...pythonArgs]);

  return new Promise((resolve, reject) => {
    let transcription = '';

    pythonProcess.stdout.on('data', (data) => {
      transcription += data;
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error: ${data}`);
      reject(data);
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Python script exited with code ${code}`);
        reject(`Python script exited with code ${code}`);
      } else {
        const textPath = path.join(__dirname, '../public/text', `${path.parse(audioPath).name}.txt`);
        fs.writeFile(textPath, transcription.trim(), (err) => {
          if (err) {
            console.error(`Error writing transcription to file: ${err}`);
            reject(err);
          } else {
            resolve(textPath);
          }
        });
      }
    });
  });
}

transcribeAudio(audioPath)
  .then((textPath) => {
    console.log(`Transcription saved to ${textPath}`);
  })
  .catch((error) => {
    console.error(`Error transcribing audio: ${error}`);
  });
  };
*/
