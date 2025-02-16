import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/ecommbackend`);
    } catch (error) {
        console.log("Error while connecting to the database", error);
    }
}


export default connectDB;