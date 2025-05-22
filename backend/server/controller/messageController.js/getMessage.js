const getMessage= async(req, res , next)=>
{
    try{
        const recieverId= req.user.data.id;
        const senderId= req.query;
    }
    catch(err)
    {
        console.log(err)
        return next({code:err.code || 500, message: err.message || "Internal Server code"})
    }
}

