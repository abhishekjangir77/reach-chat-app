import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    console.log("Trying to connect...");

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.log("ERROR MESSAGE:", error.message);
  }
};
