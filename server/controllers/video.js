const VideoSchema = require('../models/VideoModel');
const TextSchema = require('../models/fichierstext');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

ffmpeg.setFfmpegPath("C:/Users/Hp/OneDrive/Desktop/ffmpeg-master-latest-win64-gpl/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe");

exports.addVideo = async (req, res) => {
  const { title, description, iduser } = req.body;
  const videoPath = req.file.path;
  const videoExt = req.file.mimetype.split('/')[1];
  const videoFileName = req.file.filename;
  const audioFileName = 'audio_' + videoFileName.split('.')[0] + '.wav';
  const audioPath = path.join(__dirname, '../public/audio', audioFileName);
const language= req.body.language;
  try {
    ffmpeg(videoPath)
      .toFormat('wav')
      .on('error',function(err, stdout, stderr) {
        console.log(`Error converting video to audio: ${err}`);
        if (err) {
          console.log(err.message);
          console.log("stdout:\n" + stdout);
          console.log("stderr:\n" + stderr);
         // reject("Error");
      }
        // res.status(500).json({
        //   message: 'Error converting video to audio',
        //   error: err
        // });
      })
      .on('end', async () => {
        // Save the video object to the database
        // const savedVideo = await video.save();
        // console.log(savedVideo);
        console.log(audioPath)
        // Spawn a child process to run the Python script for audio transcription
        const pythonProcess = spawn('python', ['controllers/transcribe.py', audioPath,language]);
        

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
            language,
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

// exports.updateText = (req, res) => {
//   const { id } = req.params;
//   const { video } = req.body;

//   VideoSchema.findByIdAndUpdate(id, { video })
//     .then(() => res.send("Updated successfully"))
//     .catch((err) => {
//       console.log(err);
//       res.send({ error: err, msg: "Something went wrong!" });
//     });
// };

// exports.deleteVideo = (req, res) => {
//   const { id } = req.params;

//   VideoSchema.findByIdAndDelete(id)
//     .then(() => res.send("Deleted successfully"))
//     .catch((err) => {
//       console.log(err);
//       res.send({ error: err, msg: "Something went wrong!" });
//     });
//   };
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
    const textFilePath = `C:/Users/Hp/OneDrive/Desktop/SousTitre-pfe/server/public/text/${text.filename}`; // Replace with the actual path to your text files
     

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
    const videoPath = `C:/Users/Hp/OneDrive/Desktop/SousTitre-pfe/server/public/videos/${filename}`; // Replace with the actual path to your video files

    res.sendFile(videoPath);
 
}
exports.readText =async(req, res) =>{
  const { filename } = req.params;
  const textFilePath = `C:/Users/Hp/OneDrive/Desktop/SousTitre-pfe/server/public/text/${filename}`; // Replace with the actual path to your text files
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
    const textFilePath = `C:/Users/Hp/OneDrive/Desktop/SousTitre-pfe/server/public/text/${text.filename}`;
     

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
      error
    })
  }
}

exports.getVideo = async (req, res) => {
  const { id} = req.params;
  try {
      const videos = await VideoSchema.find({id})
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

exports.deleteVideo = (req, res) => {
  const { id } = req.params;

  VideoSchema.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

exports.updateTextVideo = async (req, res) => {
  const { id, text } = req.body; 
  try {
    // Find the video by id
    const video = await VideoSchema.findById(id);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Update the text field
    video.text = text;

    // Save the updated video
    await video.save();

    res.json({ message: 'Video updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
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
exports.deleteVideo = (req, res) => {
  const { id } = req.params;

  VideoSchema.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};