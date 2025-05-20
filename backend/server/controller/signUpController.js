const sequelize = require("../database/config/dbConnection");
const {v4: uuid}= require("uuidv4");
const bcrypt= require("bcrypt")


async function signUpUsers(req, res, next)
{
    try{
        const id= uuid()
        const {firstName, lastName, email, password }= req.body;

        if(!firstName || !lastName || !email || !password)
        {
            return next({code:400, message:"Please provide the necessary data"});
        }
        const emailRegex = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
        if(!emailRegex.test(email))
        {
            return next({
              code: 400,
              message: "Please provide the email address",
            });
        }

        const query = `select email from UserTables where email= :email`;

        const [checkIfUsersExist, _]= await sequelize.query(query,{
            raw:true,
            replacements:{
                email
            }
        })
        if(checkIfUsersExist)
        {
            return next({code:409, message:"Provided email with user already exist"})
        }
        const hashedPassword= await bcrypt.hash(password, )

        return res.status(201).json({message:"User created Sucessfully"})

    }
    catch(err)
    {
        console.log(err);
        return next({status:500, message:"Internal Server error "})
    }
}