
const authenticateSocket= (socket, next)=>
{
    const token= socket.handshake.auth.token;
    if(!token)
    {
        return next({code:401, message:"Token not found"});
    }

    try{
        const user = jwt.verify(token, process.env.CHAT_APP_SECRET);
        socket.user= user.data.id;
        next();
    }
    catch(err)
    {
        console.log(err);
    }
}


module.exports= {authenticateSocket};