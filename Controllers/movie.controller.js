import Movie from "../Models/movie.model.js";

export const addNewMovie = async function (req,res) {
    try {
        const movie = await Movie.create(req.body);
        movie.save();
        const allMovie = await Movie.find({}).select('-__v')
       res.status(200).json({message:" movie registeration successful",movies:allMovie})        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
    
}

export const getAllMovies = async function (req,res) {
    try {
        const allMovie = await Movie.find({}).select('-__v')
        res.status(200).json({message:" movie registeration successful",movies:allMovie})        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
    
}
