const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require("http");

const app = express();
app.use(express.json());
app.use(cors());
//CONNECT DB
const connectDB = require("./configs/connectDB");
connectDB();

//ROUTER
const routerAuth = require("./routers/auth.router");
const routerVideo = require("./routers/video.router");
const routerComment = require("./routers/comment.router");
const routerUser = require("./routers/user.router");
app.use("/api/v1/auth", routerAuth);
app.use("/api/v1/video", routerVideo);
app.use("/api/v1/comment", routerComment);
app.use("/api/v1/user", routerUser);

//Handle Error
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

//SOCKET IO
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
io.on("connection", (socket) => {});

server.listen(process.env.PORT, () => {
  console.log("backend start");
});
