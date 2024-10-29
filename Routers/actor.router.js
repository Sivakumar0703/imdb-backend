import express from "express";
import { register } from "../Controllers/actor.controller.js";
// import { protect } from "../Middlewares/auth.middleware.js";

const actorRouter = express.Router();


actorRouter.post("/register_actor",register);




export default actorRouter