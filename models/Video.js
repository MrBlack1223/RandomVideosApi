import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: false,
        unique: false
    },
    videoURL: {
        type: String,
    },
    tags: {
        type: [String]
    },
    likes: {
        type: [String],
        default: 0
    },
    dislikes: {
        type: [String],
        default: 0
    },
    comments: {
        type: [String]
    },
    authorID: {
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    }
})

export default mongoose.model("Video",VideoSchema)