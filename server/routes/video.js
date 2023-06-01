const { addVideo, getAllVideos, getFichierText, getVideoAndtext, readVideo, readText, UpdateFichierText } = require('../controllers/video')
const { videoUpload } = require('../middlewares/videoUpload')

const router = require('express').Router()


router.post('/upload', videoUpload.single('video'), addVideo)
    router.get('/videos', getAllVideos)   
    router.get('/text', getFichierText)
    router.get('/readVideo/:filename', readVideo)
    router.get('/readText/:filename', readText)
    router.get('/videoandtext/:iduser', getVideoAndtext)
    router.get('/lastfichiertext/:iduser', UpdateFichierText)
    

module.exports = router