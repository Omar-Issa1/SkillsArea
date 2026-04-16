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
