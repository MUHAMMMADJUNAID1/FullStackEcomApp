import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const registerUser = async(req,res) => {
    const {email, password,name} = req.body;
    try {
        if(!email || !password || !name) {
            return res.status(404).json({
                success : false, 
                message : "Please Fill all Fields",
            });
        }
        let user  = await User.findOne({email});
        if(user) return res.status(400).json({success : false, message : "User Already Exists"});

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);

        user = new User({email,password : hash, name});
        await user.save();

       // generate the token to send to the user
       const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);

       return res.status(201).json({
      name : user.name,
      email : user.email,
      _id : user._id,
      token
       });


    } catch (error) {
     return  res.status(500).json({
            success : false,
            message : "Unknown Error occured while User  Creating"
        })
    }
}


export const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password ) {
            return res.status(404).json({
                success : false, 
                message : "Please Fill all Fields",
            });
        }
        let user  = await User.findOne({email});
        if(!user) return res.status(400).json({success : false, message : "User Does Not Exists"});
 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success : false ,message: 'Invalid credentials' });
    
          // generate the token to send to the user
       const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);

       return res.status(200).json({
      name : user.name,
      email : user.email,
      _id : user._id,
      token
       });

    } catch (error) {
      return    res.status(500).json({
            success : false,
            message : "Unknown Error occured while LoginUser"
        })
    }
}