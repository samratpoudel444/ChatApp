const client = require("../../helpers/redisHelper")
const { authenticateSocket } = require("../../middleware/socketMiddleware")



const userConnection= async(io)=>
{
    io.use(authenticateSocket);
     io.on("connection", async (socket) => {
       await client.set(`${socket.user}`, socket.id);

       console.log(`User connected with socket id: ${socket.id}`);

       socket.on("disconnect", async () => {
         await client.del(socket.user);
         console.log(`User ${socket.user?.id || "Unknown"} disconnected`);
       });
     });
}

module.exports= {userConnection}