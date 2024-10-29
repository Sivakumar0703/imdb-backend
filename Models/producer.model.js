import mongoose, { Schema } from "mongoose";

const producerSchema = mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    bio:{ 
        type:String,
        required:true 
    },
    movies:[{
        type:Schema.Types.ObjectId,
        ref:"movies"
    }],
    image:{
        type:String,
        default:process.env.PROFILE_IMAGE_URL
    }
})

const Producer = mongoose.model("producers",producerSchema);
export default Producer