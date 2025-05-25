const { Server } = require("socket.io");
const http = require("http");
const express= require('express');
const { userConnection } = require("../controller/userController.js/userConnection");
const app= express();

 const server= http.createServer(app);
const io = new Server(4000, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});
userConnection(io);




module.exports= {io, server, app}
