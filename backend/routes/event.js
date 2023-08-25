import express from "express";
import { createevent , getEvents, getEventList} from "../controller/event.js";

const router = express.Router()

router.post("/createevent", createevent )
router.get("/getevent", getEvents)
router.get("/geteventlist", getEventList)



export default router