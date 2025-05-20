const express= require("express");
const authRouter= express.Router();


authRouter.route("/").post();



module.exports= authRouter