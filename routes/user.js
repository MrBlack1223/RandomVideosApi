import express from 'express'

import { createUser, displayUsers, deleteUser, showUserDetails, updateUser, subscribe, unsubscribe, showSearchedUser,  } from '../controllers/userController.js'
import { login, logout, verify } from '../controllers/verification.js'

const router = express.Router()
//main
router.get('/', displayUsers)
router.post('/', createUser)
router.get('/search', showSearchedUser)
//user settings
router.delete('/:userID',verify, deleteUser)
router.get('/:userID', showUserDetails)
router.put('/:userID',verify, updateUser)
//subs
router.put('/subs/add/:userID',verify,subscribe)
router.put('/subs/delete/:userID',verify,unsubscribe)
//likes
router.put('/like/add/:videoID',verify)
router.put('/like/delete/:videoID',verify)
//login
router.post('/login',login)
router.get('/test/logout',logout)
export default router