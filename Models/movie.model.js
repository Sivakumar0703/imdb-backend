import mongoose, { Schema } from "mongoose";

const movieSchema = mongoose.Schema({
    title:{
        type:String,
        required : true
    },
    year:{
        type:String,
        required:true
    },
    genre:{
        type:Array,
        required:true
    },
    stars:[ 
       { type:Schema.Types.ObjectId,
        ref:"users"}
    ],
    image:{
        type:String,
        required:true
    },
    producer:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
})

const Movie = mongoose.model("movies",movieSchema);
export default Movie