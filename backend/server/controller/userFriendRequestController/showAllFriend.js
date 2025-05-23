const sequelize = require("../../database/config/dbConnection");


const showAllFriends = async (req, res, next) => {
  try {
    const id = '0fb930c2-921c-4d88-b726-3e3c9b335c38';
    const status = `Accepted`;

    if (!id) {
      return next({ code: 401, message: `Please provide the userId` });
    }

    const query = `
     SELECT 
    b.recieverId, 
    a.firstName, 
    a.lastName
    FROM 
    userTables AS a
    JOIN 
    friendrequestTables AS b 
    ON a.id = b.recieverId
    WHERE 
    b.status = 'accepted'and a.id= :id

    `;

    const [result] = await sequelize.query(query, {
      raw: true,
      replacements: {
        id,
      },
    });

    if (result.affectedRows === 0 || result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "No friends found" });
    }

    return res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server Error",
    });
  }
};


module.exports= {showAllFriends}
