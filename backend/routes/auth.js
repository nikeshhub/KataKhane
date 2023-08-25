import express from "express";
import { login, register, logout, reslogin, resregister,  reslogout } from "../controller/auth.js";

const router = express.Router()

router.post("/login", login )
router.post("/register", register )
router.post("/logout", logout )
router.post("/restaurant/login", reslogin )
router.post("/restaurant/register", resregister )

router.post("/restaurant/logout", reslogout )



export default router