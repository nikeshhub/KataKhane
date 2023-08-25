import express from "express";
import { getallrestaurants, getrestaurantnamebyid } from "../controller/restaurant.js";

const router = express.Router()


router.get("/getallrestaurants", getallrestaurants)
router.get("/getrestaurantnamebyid", getrestaurantnamebyid)



export default router