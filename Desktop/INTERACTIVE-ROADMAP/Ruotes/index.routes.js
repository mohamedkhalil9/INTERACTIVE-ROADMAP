import express from "express";
const app = express();

import bookRoutes from "./book.routes.js";
import courseRoutes from "./course.routes.js";
// import userRoutes from "./user.routes.js";
// import authRoutes from "./auth.routes.js";

app.use("/books", bookRoutes);
app.use("/courses", courseRoutes);
// app.use("/user", userRoutes);
// app.use("/auth", authRoutes);

export default app;