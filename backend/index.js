
import express from "express"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import eventRoutes from "./routes/event.js"
import restaurantRoutes from "./routes/restaurant.js"
import reviewRoutes from "./routes/review.js"

import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();

//middlewares
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
}))
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/event", eventRoutes)
app.use("/api/restaurant", restaurantRoutes)
app.use("/api/review", reviewRoutes)


app.listen(8800, () => console.log("Server started on port 8800"));

