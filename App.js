import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AllRoutes from "./Routes/Index.js";
import { swaggerSpec, swaggerUi } from "./Utili/Swagger.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const DB = process.env.DATABASE || "mongodb://localhost:27017/CFMS";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose.connect(DB)
.then(() => console.log("Connected to the database successfully"))
.catch((err) => console.log("Database connection failed", err));


// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", AllRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
