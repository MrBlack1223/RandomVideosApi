import { createError } from "../error.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from'jsonwebtoken'

export const verify = (req,res,next)=>{
    const accesToken = req.cookies.token
    if(!accesToken) return next(createError(401,"No token"))

    jwt.verify(accesToken, process.env.JWT, (error,user)=>{
        if(error) return next(createError(403,'Wrong token'))
        req.user = user
        next()
    })
} 
export const login = async(req,res,next) => {
    const user = await User.findOne({name: req.body.name})

    if(!user) return next(createError(403,"No user found"))
    const compare = await bcrypt.compare(req.body.password, user.password)

    if(!compare) return next(createError(403,"Wrong password"))

    const {password, ...data} = user._doc
    const token = jwt.sign({ id: user._id }, process.env.JWT)
    res.cookie('token',token,{
        maxAge: 24 * 60 * 60 * 100,
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        domain: 'random-videos-api.onrender.com'
    }).status(200)
    .json(data)
}
export const logout = async(req,res,next) => {
    res.clearCookie('token',{
        maxAge: 24 * 60 * 60 * 100,
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        domain: 'random-videos-api.onrender.com'
    }).status(204)
}