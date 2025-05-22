const sequelize = require("../../database/config/dbConnection");

const acceptRequest = async (req, res, next) => {
  try {
    const recieverId = req.user.data.id;
    const {senderId} = req.query;
    const status = "accepted";

    if (!recieverId) {
      return next({ code: 401, message: "Please provide recieverId" });
    }
    if (!senderId) {
      return next({ code: 401, message: "Please provide senderId" });
    }

    const query = `
      UPDATE friendRequestTables 
      SET status = :status 
      WHERE senderId = :senderId AND recieverId = :recieverId
    `;

    const [result] = await sequelize.query(query, {
      raw: true,
      replacements: {
        status,
        senderId,
        recieverId,
      },
    });

    if (result.affectedRows === 0 || result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "No matching friend request found" });
    }

    return res.status(200).json({ message: "Friend request accepted" });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server Error",
    });
  }
};

module.exports = { acceptRequest };
