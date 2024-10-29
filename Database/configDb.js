import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

const dbConnectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rs5uv.mongodb.net/${process.env.DB_DATABASE_NAME}`
;

const ConnectDb = async() => {
    try {
      console.log("inisde db conection")
    const connection = await mongoose.connect(dbConnectionString);
      console.log("💾 mongoDb connected") 
      return connection  
    } catch (error) {
        console.log("error in mongoDb connection",error)
    }
}

export default ConnectDb