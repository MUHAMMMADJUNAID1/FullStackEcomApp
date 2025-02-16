import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/ecommerce");
    } catch (error) {
        console.log("Error while connecting to the database", error);
    }
}


export default connectDB;