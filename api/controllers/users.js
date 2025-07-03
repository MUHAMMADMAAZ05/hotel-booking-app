import User from "../models/User.js"

// update
export const updateUser=async(req,res,next)=>{
   try {
        const updatedUser =await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    } catch (err) {
        next(err)
    }
}
// delete 
export const deleteUser=async(req,res,next)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    } catch (error) {
        next(error)
    }
}

// get one Userby id 
export const getUser=async(req,res,next)=>{
     try {
        const user= await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

// get all User
export const getUsers=async(req,res,next)=>{
    try {
        const Users=await User.find()
        res.status(200).json(Users)
    } catch (err) {
        next(err)
    }
}