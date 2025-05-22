const sequelize = require("../../database/config/dbConnection");

const showAllRequest = async (req, res, next) => {
  try {
    const recieverId = req.user.data.id;
    const status= "pending"
    const query = `SELECT b.senderId, a.firstName, a.lastName, a.email
FROM userTables AS a
JOIN friendRequestTables AS b ON a.id = b.senderId
WHERE b.recieverId = :recieverId and b.status=:status
`;
    const [getAllRequest, __]= await sequelize.query(query,
        {
            raw: true,
            replacements:{
                recieverId,
                status
            }
  }  

    )
     if(getAllRequest.length === 0)
    {
        return next({code:404, message:"No request avilable"});
    }

    return res.status(200).json({getAllRequest});

  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal server error",
    });
  }
};


module.exports= {showAllRequest};