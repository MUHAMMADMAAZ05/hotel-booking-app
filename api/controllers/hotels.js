import Hotel from "../models/hotels.js"
import Room from "../models/Room.js";

// post
export const createHotel=async(req,res,next)=>{
    const newHotel=new Hotel(req.body)
    try {
        const savedHotel= await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    }
}
// update
export const updateHotel=async(req,res,next)=>{
   try {
        const updatedHotel= await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}
// delete 
export const deleteHotel=async(req,res,next)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
    } catch (error) {
        next(error)
    }
}

// get one hotel by id 
export const getHotel=async(req,res,next)=>{
     try {
        const hotel= await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}

// get all hotels
export const getHotels = async (req, res, next) => {
  const { min, max,limit, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(parseInt(limit) || 10);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};


export const countByCity=async(req,res,next)=>{
    const cities=req.query.cities.split(",")
    try {
        const list=await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

export const countByType=async(req,res,next)=>{
    
    try {
        const hotelCount=await Hotel.countDocuments({type:"hotel"})
        const resortCount=await Hotel.countDocuments({type:"resort"})
        const apartment=await Hotel.countDocuments({type:"apartment"})
        const villaCount=await Hotel.countDocuments({type:"villa"})
        const cabinCount=await Hotel.countDocuments({type:"cabin"})
         
        res.status(200).json([
            {type:"hotel",count: hotelCount},
            {type:"resort",count: resortCount},
            {type:"apartment",count: apartment},
            {type:"villa",count: villaCount},
            {type:"cabin",count: cabinCount}
        ])
    } catch (err) {
        next(err)
    }
}


export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const rooms = await Promise.all(
        hotel.rooms.map((room) => {
        return  Room.findById(room)
      })
    );
    res.status(200).json(rooms)
  } catch (err){
    next(err);
  }
};

