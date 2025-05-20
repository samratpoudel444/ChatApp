

async function errorHandler(err, req, res ,next)
{
    return res.status(err.code ||err.status || 500 ).json({
        message: err.message || err.details ||"intenal server error"
    })
    
}


module.exports= {errorHandler}