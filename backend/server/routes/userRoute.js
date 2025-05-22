const express= require("express");
const { MakeRequest } = require("../controller/userFriendRequestController/makeRequest");
const { authMiddleware } = require("../middleware/authMiddleware");
const { rejectRequest } = require("../controller/userFriendRequestController/rejectRequest");
const { acceptRequest } = require("../controller/userFriendRequestController/acceptRequest");
const { showAllRequest } = require("../controller/userFriendRequestController/showAllRequest");

const userRouter= express.Router();

userRouter.route("/makeRequest").post(authMiddleware, MakeRequest);
userRouter.route('/rejectRequest').put(authMiddleware, rejectRequest)
userRouter.route("/acceptRequest").put(authMiddleware, acceptRequest);
userRouter.route("/showAllRequest").get(authMiddleware, showAllRequest);
module.exports= userRouter;