require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const FeedbackRoutes = require("./Routes/Feedback");
const ClassRoutes = require("./Routes/Class");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/comentarios", FeedbackRoutes);
app.use("/class", ClassRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));