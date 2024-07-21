import mongoose from "mongoose";


const connectToMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL) ;
        console.log('SERVER CONNECT TO DB') ;
    } catch (error) {
        console.log("ERROR IN CONNECTING TO MONGODB", error.message) ;
    }
};

export default connectToMongoDB ;