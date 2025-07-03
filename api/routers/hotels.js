import express from "express"
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotels.js"
import { verifyAdmin } from "../utils/verify_token.js"

const router=express.Router()

//create
router.post('/',verifyAdmin, createHotel)
// update
router.put('/:id',verifyAdmin, updateHotel)
// Delete
router.delete('/:id',verifyAdmin,deleteHotel)
// Get
router.get('/Find/:id', getHotel)
// Get All
router.get('/', getHotels)
router.get('/countByCity',countByCity)
router.get('/countByType',countByType)
router.get("/room/:id", getHotelRooms);

export default router