import mongoose, { Schema } from "mongoose";

const actorSchema = mongoose.Schema({
    name : {
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
    films:[{
        type:Schema.Types.ObjectId,
        ref:"movies"
    }],
    image:{
        type:String,
        default:process.env.PROFILE_IMAGE_URL
    }
})

const Actor = mongoose.model("actors",actorSchema);
export default Actor