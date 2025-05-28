require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/db");

const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const postRoutes = require('./router/postRoutes');
const errorMiddleware = require("./mildlewares/err-middleware");

const app = express();

// ✅ Use FRONTEND_URL from .env
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
}));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/posts", postRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.BACKEND_URL}`);
  });
});
