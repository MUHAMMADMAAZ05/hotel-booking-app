import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authrouter from "./routers/auth.js"
import usersrouter from "./routers/users.js"
import hotelsrouter from "./routers/hotels.js"
import roomrouter from "./routers/room.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app= express()
dotenv.config()

const connect=async ()=>{

    try {
        await mongoose.connect(process.env.MongoURL)
        console.log("Connected to MongoDB.")
    } catch (error) {
        throw error
    }

} 

mongoose.connection.on("disconnected",()=>{
    console.log("Disconnected from MongoDB.")
})


// middle vares
app.use(cors())
app.use(cookieParser())
app.use(express.json())


app.use("/api/auth",authrouter)
app.use("/api/users",usersrouter)
app.use("/api/hotels",hotelsrouter)
app.use("/api/room",roomrouter)



app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500
    const errorMessage=err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
    
})


app.listen(3000,()=>{
    connect()
    console.log("connected to Bakend...")
})
