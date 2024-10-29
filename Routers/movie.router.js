import express from "express";
import { addNewMovie, getAllMovies } from "../Controllers/movie.controller.js";
import { protect } from "../Middlewares/auth.middleware.js";

const movieRouter = express.Router();


movieRouter.post("/register_movie",protect,addNewMovie);
movieRouter.get("/get_all_movies",protect,getAllMovies);




export default movieRouter