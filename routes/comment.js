import express from 'express'
import { addComment, deleteComment, showComments } from '../controllers/commentController.js'
import { verify } from '../controllers/verification.js'

const router = express.Router()

router.post('/',verify,addComment)
router.get('/:videoID',showComments)

router.delete('/:commentID',verify,deleteComment)

export default router