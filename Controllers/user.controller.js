import User from "../Models/user.model.js";
import { createToken, hashCompare, hashPassword } from "./encryptAndDecrypt.controller.js";

// register
export const register = async(req,res) => {
    const {email , password} = req.body;
    try {
        const isUserExist = await User.findOne({email});
        if(isUserExist){
            return res.status(400).json({message:"user already exist"})
        }
        const hashedPassword = await hashPassword(password);
        req.body.password = hashedPassword;
        const user = await User.create(req.body);
        user.save()
       res.status(200).json({message:"registeration successful"}) 
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}

// login
export const login = async(req,res) => {
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"No User Found"});
        }
        const token =  await createToken({id:user._id})
        const isPasswordMatched = await hashCompare(password,user.password)
        if(!isPasswordMatched){
           return res.status(400).json({message:"Invalid Password"})
        }
        const userData =  {...user._doc , token}; // sending user data to client
        delete userData.password
        delete userData.__v
        if(user.token){
            user.token = token;
            user.save()
        } 
        res.status(200).json({message:"Login Successful",userData:{...userData , token:token}})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error log",error});      
    }
}

// get user by id
export const getUser = async(req,res) => {
    try {
        const userData = req.user;
        delete userData.password
        delete userData.__v
        res.status(200).json({message:"user data found",userData})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error log",error});      

    }  
}

// update user
export const update = async(req,res) => {
    try {
        const userData = req.user;
        const newData = req.body;
       let updatedUser = await User.findByIdAndUpdate(userData._id , newData , {new:true} );
       if(!updatedUser){
        return res.status(400).json({message:"user not found"})
       }
       updatedUser =  updatedUser.toObject()
       delete updatedUser.__v
       delete updatedUser.password
       delete updatedUser._id
       res.status(200).json({message:"updation successful",updatedUser}) 
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}

// get all user
export const getAllUser = async(req,res) => {
    try {
        const userList = await User.find().select('-password -__v -token').populate('moviesActed').populate('moviesProduced');
        res.status(200).json({message:"user list received",userList})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error log",error});      
    }  
}

// update acted movie list & movie produced list
export const addRecentlyActedMovie = async(req,res) =>{
    try {
        const{isProducer,actorId,movieId} = req.body;
        const actor = await User.findById(actorId);
        if(!actor){
            return res.status(400).json({message:"actor/producer not found"});
        }
        console.log("actor",actor)
        if(isProducer){
            actor.moviesProduced.push(movieId);
        }else{
            actor.moviesActed.push(movieId);
        }
        await actor.save()
        res.status(200).json({message:"new movie added to acted/produced list"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error log",error});  
        console.log(error)    
    }
}


