const sequelize = require("../../database/config/dbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return next({ code: 400, message: "Please provide email" });
    }
    if (!password) {
      return next({ code: 400, message: "Please provide password" });
    }

    const query = `select id, email, password from userTables where email = :email`;
    const [checkIfUsersExist, __] = await sequelize.query(query, {
      raw: true,
      replacements: { email },
    });

    if (checkIfUsersExist.length === 0) {
      return next({ code: 409, message: "User with provided email does not exist" });
    }

    const user = checkIfUsersExist[0];
    const dbPassword = user.password;

    const checkPassword = await bcrypt.compare(password, dbPassword);

    if (!checkPassword) {
      return next({
        code: 409,
        message: "Provided password is invalid",
      });
    }

    const payLoad = {
      id: user.id,
      email: email,
    };

    const token = jwt.sign({ data: payLoad }, process.env.CHAT_APP_SECRET, {
      expiresIn: "1h",
    });



    return res.cookie("token", token).status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    if (err) {
      return next({ code: err.code || 500, message: err.message });
    }
    return next({ code: 500, message: "Internal server error" });
  }
};

module.exports = { signInUser };
