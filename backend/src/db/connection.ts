import { connect, disconnect } from "mongoose";
export default async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw new Error("Cannot Connect To MongoDB");
  }
}

async function disconnectFromDB() {
  try {
    await disconnect();
  } catch (error) {}
}

export { connectToDatabase, disconnectFromDB }