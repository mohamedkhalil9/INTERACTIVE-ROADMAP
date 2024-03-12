import express from "express";
import appRoutes from "./Ruotes/index.routes.js";

import cors from "cors";
import { dbConnection } from "./config/db.js";

const app = express();

// middleware parse body
app.use(express.json());

// middleware cors policy
// 2 options - (*) for all
// app.use(cors());
// allow custom
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "UPDATE", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// app routes
app.use("/", appRoutes)

// db connection
dbConnection();

export default app;