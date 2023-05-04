import { createError } from "../error.js"
import Comment from "../models/Comment.js"


export  const addComment = async(req,res,next)=>{
    const comment = new Comment({...req.body,author: req.user.id})
    try{
        const savedComment = await comment.save()
        res.send(savedComment).status(200)
    }catch(e){
        next(e)
    }
}
export const showComments = async(req,res,next)=>{
    try{
        const comments = await Comment.find({videoID: req.params.videoID})
        res.status(200).send(comments)
    }catch(e){
        next(e)
    }
}
export const deleteComment = async(req,res,next) => {
    try{
        const comment = await Comment.findOne({_id: req.params.commentID})
        if(req.user.id === comment.author){
            await Comment.findByIdAndDelete(comment._id)
            res.send("comment has beend deleted")
        }
        else{
            next(createError(403,"you can delete only your comment"))
        }
    }catch(e){
        next(e)
    }
}