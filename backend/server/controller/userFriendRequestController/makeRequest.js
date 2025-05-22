const { v4: uuidv4 } = require("uuid");
const sequelize = require("../../database/config/dbConnection");

const MakeRequest = async (req, res, next) => {
  try {
    const id = uuidv4();
    const senderId = req.user.data.id;
    const { recieverId } = req.query;

    if (!recieverId) {
      return res.status(400).json({ message: "recieverId is required" });
    }

    const CheckRequestQuery = `select * from friendRequestTables where senderId= :senderId and recieverId= :recieverId`;

    const [checkRequestExists, __]= await sequelize.query(CheckRequestQuery,{
        raw:true,
        replacements:{
            senderId,  recieverId
        }
    }
    )

    if(checkRequestExists)
    {
        return next({code:401, message:"Friend request already Exist"})
    }

    const query = `
      INSERT INTO friendRequestTables (id, senderId, recieverId)
      VALUES(:id, :senderId, :recieverId)
    `;

    await sequelize.query(query, {
      raw: true,
      replacements: {
        id,
        senderId,
        recieverId,
      },
    });

    return res
      .status(200)
      .json({ message: "Friend request sent successfully." });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server Error",
    });
  }
};

module.exports = { MakeRequest };
