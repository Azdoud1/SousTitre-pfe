const { addVideo,deleteVideo, getAllVideos, getFichierText, getVideo, getVideoAndtext, readVideo, readText, UpdateFichierText, updateTextVideo } = require('../controllers/video')
const { videoUpload } = require('../middlewares/videoUpload')

const router = require('express').Router()


router.post('/upload', videoUpload.single('video'), addVideo)
    router.get('/videos', getAllVideos)   
    router.get('/text', getFichierText)
    router.get('/readVideo/:filename', readVideo)
    router.get('/readText/:filename', readText)
    router.get('/videoandtext/:iduser', getVideoAndtext)
    router.get('/lastfichiertext/:iduser', UpdateFichierText)
    router.get('/video/:id', getVideo)
    
    router.post("/videotextupdate", updateTextVideo);
    // router.delete("/delete/:id", deleteVideo);
    router.delete("/delete/:id", deleteVideo);

module.exports = router