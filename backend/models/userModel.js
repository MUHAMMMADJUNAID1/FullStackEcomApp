import mongoose,{ Schema } from "mongoose";

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    googleId : {
        type : String,
        default : "https://localhost:5173",
    },
    name : {
        type : String,
        
    },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);


