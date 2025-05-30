require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDb = require("./utils/db");
const ChatMessage = require("./models/ChatMessage");

const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const postRoutes = require('./router/postRoutes');
const chatRoutes = require('./router/chatRoutes');
const errorMiddleware = require("./mildlewares/err-middleware");

const app = express();
const server = http.createServer(app);

// ✅ Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ✅ Socket.IO Events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', ({ username, interest }) => {
    socket.join(interest);
    console.log(`${username} joined room: ${interest}`);
  });

  socket.on('sendMessage', async ({ user, interest, text }) => {
    try {
      const newMsg = new ChatMessage({ user, interest, text });
      await newMsg.save();
      io.to(interest).emit('receiveMessage', { user, text });
    } catch (error) {
      console.error("Error saving message:", error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// ✅ Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
}));

app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/posts", postRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Error middleware
app.use(errorMiddleware);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
connectDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running at ${process.env.BACKEND_URL || "http://localhost:" + PORT}`);
  });
});


//  // server.js

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDb = require("./utils/db");

// const authRoute = require("./router/auth-router");
// const contactRoute = require("./router/contact-router");
// const postRoutes = require("./router/postRoutes");
// const errorMiddleware = require("./mildlewares/err-middleware");

// const app = express();

// // ✅ Allow frontend URL from .env for CORS
// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
//   credentials: true,
// }));

// // ✅ Middleware to parse JSON bodies
// app.use(express.json());

// // ✅ Routes
// app.use("/api/auth", authRoute);
// app.use("/api/form", contactRoute);
// app.use("/api/posts", postRoutes);

// // ✅ Error handling middleware
// app.use(errorMiddleware);

// // ✅ Connect to database and start server
// const PORT = process.env.PORT || 5000;
// connectDb().then(() => {
//   app.listen(PORT, () => {
//     console.log(`✅ Server is running on ${process.env.BACKEND_URL}`);
//   });
// });

 
