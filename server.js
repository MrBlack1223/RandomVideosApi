import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import user from "./routes/user.js"
import video from "./routes/video.js"
import comment from "./routes/comment.js"
import cookieParser from "cookie-parser"
import cors from 'cors'

const PORT = 5000;

dotenv.config()
const app = express()

app.use(cookieParser())
app.use(
    cors({ 
        credentials: true,
        origin: "http://localhost:3000" })
);



const connect = ()=>{
    mongoose.connect(process.env.MONGODB).then(()=>{
        console.log("db connected")
    }).catch((err)=>{
        console.log(err)
    })
}
app.use(express.json())

app.use('/video',video)
app.use('/user',user)
app.use('/comments',comment)




app.listen(PORT,()=>{
    connect()
    console.log("server is running")
})