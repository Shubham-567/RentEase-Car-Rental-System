import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`The server is running on ${PORT}`);
    });
  } catch (error) {
    console.error("Database Connection Failed ", error);
  }
};

startServer();
