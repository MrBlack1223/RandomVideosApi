import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String,
        required: false,
        unique: false,
        default: ""
    },
    banner: {
        type: String,
        required: false,
        unique: false,
    },
    videos: {
        type: [String],
    },
    subscribers: {
        type: [String],
    },
    subscribed: {
        type: [String]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    }
})

export default mongoose.model("User",UserSchema)