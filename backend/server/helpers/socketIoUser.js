const { Server } = require("socket.io");
const http = require("http");
const { userConnection } = require("../controller/messageController.js/userConnection");
const express= require('express');
const app= express();


 const server= http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

userConnection(io)


module.exports= {io, server, app}
