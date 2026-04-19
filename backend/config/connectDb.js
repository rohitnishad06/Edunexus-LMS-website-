import mongoose from "mongoose";
import dns from "dns"

// for mongodb atlas
dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("error", error);
  }
};
export default connectDb;
