import express from 'express'
import { verify } from '../controllers/verification.js'
import { addVideo, dislikeVideo, showVideoByTag, likeVideo, showRandomVideos, showSubscribedVideos, showTrendingVideos, showSearchedVideo, showVideoByID, showUsersVideos } from '../controllers/videoController.js'

const router = express.Router()
router.get('/',showRandomVideos)
router.get('/:videoID',showVideoByID)
router.get('/subscribed/:userID',showUsersVideos)

router.get('/search/trending',showTrendingVideos)
router.get('/search/subscribed',verify,showSubscribedVideos)
router.get('/search/tags',showVideoByTag)
router.get('/search/search',showSearchedVideo)

router.put('/like/:videoID',verify,likeVideo)
router.put('/dislike/:videoID',verify,dislikeVideo)

router.post('/add',verify,addVideo)

export default router