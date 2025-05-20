const sequelize = require("../../database/config/dbConnection");
const dotenv = require("dotenv");
dotenv.config();

const { v4: uuidV4 } = require("uuid");
const bcrypt = require("bcrypt");

async function signUpUsers(req, res, next) {
  try {
    const id = uuidV4();
    const { firstName, lastName, email, password } = req.body;

    // Validation for required fields
    if (!firstName || !lastName || !email || !password) {
      return next({ code: 400, message: "Please provide the necessary data" });
    }

    // ✅ FIX: Email regex was a string. It should be a RegExp object
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next({
        code: 400,
        message: "Please provide a valid email address",
      });
    }

    // Check if user already exists
    const query = `SELECT email FROM UserTables WHERE email = :email`;
    const [checkIfUsersExist] = await sequelize.query(query, {
      raw: true,
      replacements: { email },
    });

    if (checkIfUsersExist.length > 0) {
      return next({
        code: 409,
        message: "Provided email already exists",
      });
    }

    const saltRounds = parseInt(process.env.SALT_ROUND) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertQuery = `
      INSERT INTO UserTables (id, firstName, lastName, email, password)
      VALUES (:id, :firstName, :lastName, :email, :hashedPassword)
    `;

    await sequelize.query(insertQuery, {
      raw: true,
      replacements: {
        id,
        firstName,
        lastName,
        email,
        hashedPassword,
      },
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return next({
      code: 500,
      message: err.message || "Internal Server Error",
    });
  }
}

module.exports = { signUpUsers };
