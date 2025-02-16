import "dotenv/config";
import express from "express";
import connectDB from "./db/connectDB.js";
import cors from "cors";
import authRouter from "./routes/authRouter.js";

// setting up port
const port = process.env.PORT || 4000;

// creating express Instance
const app = express();

app.use(cors(
    {origin : "*"}
));

app.use(express.json());

// apis 
app.use("/auth",authRouter);

app.get("/" ,(req,res) => {
    res.send("Hello world from the backend");
});


app.listen(port , () => {
    connectDB().then(() => {
        console.log("MongoDb connected Successfully!");
        
    })
    console.log(`Server on listineng on ${port}`);
})



