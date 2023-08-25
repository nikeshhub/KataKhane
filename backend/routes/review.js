import express from "express";
import { writereview, getReviewListByRestaurantID, getReviewfeed  } from "../controller/review.js";

const router = express.Router()


router.post("/createreview", writereview)
router.get("/getReviewListByRestaurantID", getReviewListByRestaurantID)
router.get("/getReviewfeed", getReviewfeed)



export default router