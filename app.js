import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// routes
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import courseRoutes from "./routes/courses.js";
// middlewares
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/not-found.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/courses", courseRoutes);

// not found
app.use(notFound);

// error handler
app.use(errorHandler);
// start server
const start = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log("Server Error:", error);
  }
};

start();
