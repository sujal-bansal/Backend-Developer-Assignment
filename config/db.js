import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDb Connect : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connection to mongoDb : ${error.message}`);
    process.exit(1);
  }
};

export default connectMongoDb;
