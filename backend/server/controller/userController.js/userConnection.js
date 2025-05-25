//const client = require("../../helpers/redisHelper")
//const { authenticateSocket } = require("../../middleware/socketMiddleware")

const userConnection= async(io)=>
{
  console.log("hello")
    //io.use(authenticateSocket);
     io.on("connection", async (socket) => {
      //  await client.set(`${socket.user}`, socket.id);
      console.log("testing",socket)
      //  console.log(`User connected with socket id: ${socket.id}`);

       socket.on("disconnect", async () => {
        //  await client.del(socket.user);
        //  console.log(`User ${socket.user?.id || "Unknown"} disconnected`);
        console.log("diss",socket)
       });
     });
}

module.exports= {userConnection}
