import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    videoID: {
        type:String,
        required: true
    }

    
})

export default mongoose.model("Comment",CommentSchema)