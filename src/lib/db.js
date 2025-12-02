import mongoose from "mongoose"
export async function connectDB(){
    try{
        if(mongoose.connection.readyState===1){
            return;
        }

        if(!process.env.MONGO_URI){
            throw new Error("MONGO URI is not defined");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected");
    }catch(error){
        throw error;
    }
}