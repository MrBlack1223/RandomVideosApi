import { createError } from '../error.js'
import User from '../models/User.js'
import Video from '../models/Video.js'



export const showVideoByID = async(req,res,next)=>{
    try{
        const video = await Video.findByIdAndUpdate(req.params.videoID,{ $inc: {views:1}})
        res.send(video)
    }catch(e){
        next(e)
    }
}
export const showRandomVideos = async(req,res,next)=>{
    try{
        const videos = await Video.aggregate([{$sample:{size:40}}])
        res.send(videos)
    }catch(e){
        next(e)
    }
}
export const showTrendingVideos = async(req,res,next)=>{
    try{
        const videos = await Video.find({}).sort({views: -1}).limit(3)
        res.send(videos)
    }catch(e){
        next(e)
    }
}
export const showVideoByTag = async(req,res,next)=>{
    const tags = req.query.tags.split(",")
    try{
        const videos = await Video.find({tags:{$in: tags}}).limit(20)
        res.send(videos)
    }catch(e){
        next(e)
    }
}
export const showSearchedVideo = async(req,res,next)=>{
    const search = req.query.search
    try{
        const videos = await Video.find({title: {$regex : search, $options: "i"}}).limit(40)
        res.send(videos)
    }catch(e){
        next(e)
    }
}
export const showSubscribedVideos = async(req,res,next)=>{
    try{
        const user = await User.findById(req.user.id)
        console.log(user.subscribed)
        const videos = await Promise.all(
            user.subscribed.map((userID)=>{
                return Video.find({authorID: userID})
            })
        )
        res.send(videos.flat())
    }catch(e){
        next(e)
    }
}
export const showUsersVideos = async(req,res,next)=>{
    try{
        const videos = await Video.find({authorID: req.params.userID})
        console.log(videos)
        res.send(videos.flat())
    }catch(e){
        next(e)
    }
}
export const addVideo = async(req,res,next)=>{
    const userID = req.user.id
    const newVideo = new Video({...req.body, authorID: userID})
    try{
        await newVideo.save()
        res.send(newVideo).send("Video has been added!")
    }catch(e){
        next(e)
    }
}
export const likeVideo = async(req,res,next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.videoID,{
            $addToSet: {likes: req.user.id},
            $pull: {dislikes: req.user.id}
        }) 
        res.send("Liked")
    }catch(e){
        next(e)
    }
}
export const dislikeVideo = async(req,res,next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.videoID,{
            $addToSet: {dislikes: req.user.id},
            $pull: {likes: req.user.id}
        }) 
        res.send("Unliked")
    }catch(e){
        next(e)
    }
}