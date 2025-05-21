const jwt= require("jsonwebtoken")

const authMiddleware= async(req, resp, next)=>
{
    try{
        const token= req.headers.authorization.split(" ")[1];
        if(!token)
        {
            return next({code:401, message:"Token not found"});
        }
       const decoded = jwt.decode(token, process.env.CHAT_APP_SECRET);
       if(!decoded)
       {
            return next({code:400, message:"No token data found"})
       }
       req.user= decoded;
       next();
    }
    catch(err)
    {
        console.log(err)
        return next({code:err.code || 500, message:err.message || "Internal Server error"})
    }
}

module.exports= {authMiddleware}