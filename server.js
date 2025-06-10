require ("dotenv").config();
const express=require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app=express();

app.use(express.json());
const corsOptions = {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };
  app.use(cors(corsOptions));

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


//serve upload folder
app.use("/uploads", express.static(path.join(__dirname,"uploads")));
const PORT =process.env.PORT || 8000;
app.listen (PORT, ()=> console.log(`Server running on port ${PORT}`));