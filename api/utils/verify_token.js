import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token
    if(!token) return next(createError(401,"You are not authenticated"))

    jwt.verify(token,process.env.jwt_key,(err,user)=>{
        if(err) return next(createError(403,"Token is invalid"))
        req.user=user
        next()
    })
}

export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin) return next()
            return next(createError(403,"You are not allowed to access this route"))
    })
}

export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin) return next()
            return next(createError(403,"You are not allowed to access this route"))
    })
}