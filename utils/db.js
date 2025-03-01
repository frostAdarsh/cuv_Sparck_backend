
import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName:"Cuvette_Final_one"
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;