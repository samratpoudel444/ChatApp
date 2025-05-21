

async function errorHandler(err, req, res ,next)
{
    console.log(err)
    return res.status(err.code ||err.status || 500 ).json({
        message: err.message || err.details ||"internal server error"
    })
    
}


module.exports= {errorHandler}