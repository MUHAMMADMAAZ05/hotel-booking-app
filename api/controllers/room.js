import Room from "../models/Room.js"
import Hotel from "../models/hotels.js"

export const createRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelid
    const newRoom=new Room(req.body)
    try {
       const savedRoom=await newRoom.save()
       try {
        await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}})
       } catch (error) {
        next(error)
       }
       res.status(200).json(savedRoom) 
    } catch (error) {
        next(error)
    }  
}
// update
export const updateRoom=async(req,res,next)=>{
   try {
        const updatedRoom= await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedRoom)
    } catch (err) {
        next(err)
    }
}
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumber._id": req.params.id },
      {
        $push: {
          "roomNumber.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room Dates Now available been updated.");
  } catch (err) {
    next(err);
  }
};


// delete 
export const deleteRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelid
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
       } catch (error) {
        next(error)
       }
        res.status(200).json("Room has been deleted")
    } catch (error) {
        next(error)
    }
}

// get one hotel by id 
export const getRoom=async(req,res,next)=>{
     try {
        const room= await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        next(error)
    }
}

// get all hotels
export const getRooms=async(req,res,next)=>{
    try {
        const rooms=await Room.find()
        res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }
}