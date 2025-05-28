
require("dotenv").config();
const express = require("express");
const cors = require("cors"); // ✅ Add this
const connectDb = require("./utils/db");

const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const postRoutes = require('./router/postRoutes');
const errorMiddleware = require("./mildlewares/err-middleware");

const app = express();

// ✅ CORS setup — allow frontend to call backend
app.use(cors({
  origin: 'http://localhost:5173',// frontend's port
methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
}));

// ✅ Middleware to parse JSON,
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/posts", postRoutes);

// ✅ Error middleware
app.use(errorMiddleware);

// ✅ Start server
const PORT = process.env.PORT || 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
  });
});

// require("dotenv").config();
// const  express =require("express");
// const connectDb=require("./utils/db");
// const app=express();
// const authRoute=require("./router/auth-router");
// const contactRoute=require("./router/contact-router");
// const postRoutes = require('./router/postRoutes');
// const errorMiddleware = require("./mildlewares/err-middleware");
// app.use(express.json());
// app.use("/api/auth",authRoute);
// app.use("/api/form",contactRoute); 
// app.use('/api/posts', postRoutes);
// app.use(errorMiddleware);
// //we are using a middleware telling it we are using json
// const PORT=5000;
// connectDb().then(()=>{
// app.listen(PORT,()=>{
//     console.log("server is running......");
// })
// });