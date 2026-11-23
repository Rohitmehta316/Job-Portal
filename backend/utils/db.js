import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in backend/.env");
        }

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("mongodb connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        if (error.reason) {
            console.error("Topology reason:", error.reason);
        }
    }
};

export default connectDB;