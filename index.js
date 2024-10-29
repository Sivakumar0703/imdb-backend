import express from "express";
import "dotenv/config";
import cors from "cors";
import ConnectDb from "./Database/configDb.js";
import userRouter from "./Routers/user.router.js";
import movieRouter from "./Routers/movie.router.js";
import actorRouter from "./Routers/actor.router.js";
import producerRouter from "./Routers/producer.router.js";




const app = express();
const port = process.env.PORT;

// middleware
app.use(cors())
app.use(express.json());
app.use("/api/user",userRouter);
app.use("/api/movie",movieRouter);
app.use("/api/actor",actorRouter);
app.use("/api/producer",producerRouter);

ConnectDb();


app.listen(port , ()=>{
    console.log("💻 server is running @ ",port)
})