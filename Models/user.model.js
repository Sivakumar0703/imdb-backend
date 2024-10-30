import mongoose , { Schema } from 'mongoose';

const userSchema = mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,
    required:true
},
dob:{
    type:String,
},
gender:{
    type:String,
},
bio:{
    type:String,
},
category:{
    type:String,
},
moviesActed:[
    {
        type:Schema.Types.ObjectId,
        ref:"movies"
    }
],
moviesProduced:[
    {
        type:Schema.Types.ObjectId,
        ref:"movies"
    }
],
watchList:[
    {
        type:Schema.Types.ObjectId,
        ref:"movies"
    }
],
image:{
    type:String,
    default:process.env.PROFILE_IMAGE_URL
},
token:{
    type:String
}

},{timestamp:true})

const User = mongoose.model('users',userSchema);
export default User