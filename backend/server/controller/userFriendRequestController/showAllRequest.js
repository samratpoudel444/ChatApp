const sequelize = require("../../database/config/dbConnection");

const showAllRequest = async (req, res, next) => {
  try {
    const userId = ``;
    const query = `select a.senderId, b.firstName, b.lastName, b.email, from usertables as a and 
    friendRequestTables as b on a.id = b.senderId where recieverId= :userId;`;
    const [getAllRequest, __]= await sequelize.query(query,
        {
            raw: true,
            replacements:{
                userId
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