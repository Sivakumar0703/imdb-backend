import express from "express";
import { addRecentlyActedMovie, getAllUser, getUser, login, register, update } from "../Controllers/user.controller.js";
import { protect } from "../Middlewares/auth.middleware.js";

const userRouter = express.Router();


userRouter.post("/register_user",register);
userRouter.post("/login",login);
userRouter.get("/getUser",protect,getUser);
userRouter.put("/update_user",protect,update);
userRouter.get("/get_all_user",protect,getAllUser);
userRouter.put("/update_acted_movie",protect,addRecentlyActedMovie);



export default userRouter