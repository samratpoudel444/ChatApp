const {v4:uuidv4}= require("uuid");
const sequelize = require("../../database/config/dbConnection");
const MakeRequest= async()=>
{
    try{
        //const userId= req.params;
        const id= uuidv4();
        const senderId = req.user.id;
        const recieverId= req.params;
        const query = `INSERT INTO friendRequestTables (id,senderId,recieverId) VALUES(:id, :senderId, :recieverId)`;
        const [MakeRequests, __]= await sequelize.query(query,{
            raw:true,
            replacements:{
                id, senderId, recieverId
            }
        })
        console.log(MakeRequests)
    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code ||500, message:err.message || "Internal Server error" })
    }
}

module.exports={MakeRequest}