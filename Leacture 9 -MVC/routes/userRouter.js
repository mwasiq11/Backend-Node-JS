// External Module
const express = require('express');
const userRouter = express.Router();

const homeControllers=require("../controllers/homes")
userRouter.get("/",homeControllers.gethomePage)
exports.userRouter = userRouter;