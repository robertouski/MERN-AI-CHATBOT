import mongoose from "mongoose";
export default async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log("Error on mongoose connect", error);
    throw new Error("Cannot Connect To MongoDB")
  }
}

async function disconnectFromDB() {
  try {
    await mongoose.disconnect();
  } catch (error) {}
}

export { connectToDatabase, disconnectFromDB };
