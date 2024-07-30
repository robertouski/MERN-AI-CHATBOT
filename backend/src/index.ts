import app from "./app.js";
import connectToDatabase from "./db/connection.js";

const PORT = process.env.PORT || 5000
console.log("Here is the PORT", PORT)
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log("Server Open & connected to DB"));
  })
  .catch((err) => console.log(err));
