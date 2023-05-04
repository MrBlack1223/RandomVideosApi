import bcrypt from 'bcrypt'
import { createError } from '../error.js'
import User from '../models/User.js'

export const createUser = async(req,res)=>{
    try{
        const hashedPassword = bcrypt.hashSync(req.body.password,10)
        await new User({...req.body, password: hashedPassword}).save()
        res.status(200).send('User has been added!')
    }catch(error){
        res.json(createError(error.status,'Something went wrong'))
    }
} 
export const displayUsers = async(req,res)=>{
    const allUsers = await User.find({})
    res.json(allUsers)
}
export const deleteUser = async(req,res)=>{
    if(req.user.id === req.params.userID){
        try{
            const user = await User.deleteOne({_id: req.params.userID})
            res.status(200).send("User has been deleted")
        }catch(error){
            res.json(createError(error.status,'Something went wrong'))
        }
    }
    else return res.json(createError(403,'You can delete only your account'))
}
export const showUserDetails = async(req,res) =>{
    try{
        const user = await User.findById(req.params.userID)
        const {password,...data} = user._doc
        res.json({data})
    }catch(error){
        res.json(createError(error.status,'No user found'))
    }
}
export const updateUser = async(req,res) =>{
    if(req.user.id === req.params.userID){
        try{
            const user = await User.findById(req.params.userID)
            await user.updateOne(req.body)
            res.status(200).jsno(user)
        }catch(error){
            res.send(error)
        }
    }
    else return res.json(createError(403,'You can update only your account'))
}
export const subscribe = async(req,res) => {
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $addToSet: {subscribed: req.params.userID}
        })
        await User.findByIdAndUpdate(req.params.userID,{
            $addToSet : {subscribers: req.user.id}
        })
        res.send("Subscribed")
    }catch(error){
        return res.json(createError(500,"Something went wrong"))
    }
}
export const unsubscribe = async(req,res) => {
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $pull: {subscribed: req.params.userID}
        })
        await User.findByIdAndUpdate(req.params.userID,{
            $pull: {subscribers: req.user.id}
        })
        res.send("Unsubscribed")
    }catch(error){
        return res.json(createError(500,"Something went wrong"))
    }
}
export const showSearchedUser = async(req,res,next)=>{
    const search = req.query.search
    try{
        const users = await User.find({name: {$regex : search, $options: "i"}}).limit(20)
        const noPasswordUsers = users.map((user)=>{
            const {password,...data} = user._doc
            return data  
        })
        res.send(noPasswordUsers)
    }catch(e){
        next(e)
    }
}