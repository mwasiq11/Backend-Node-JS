// External Module
const express = require('express');
const hostRouter = express.Router();

const homeControllers=require("../controllers/homes")
hostRouter.get("/add-home",homeControllers.getAddhome)
hostRouter.post("/add-home",homeControllers.postHomeAdded)
// hostRouter.get("/", homeControllers.getHomes);

exports.hostRouter = hostRouter;

