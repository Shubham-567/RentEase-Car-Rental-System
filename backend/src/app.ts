import express from "express";
import cors from "cors";
import router from "./routes/router.js";

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://rent-ease-site.vercel.app", // deployed frontend
];

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", router);

export default app;
