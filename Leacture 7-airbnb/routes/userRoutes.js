// External module
const express=require('express')
const userRoutes=express.Router()
// Core module
const path=require('path')
const rootDir=require('../utils/pathUtils')



userRoutes.get("/",(req,res,next)=>{
	res.sendFile(path.join(rootDir,'views','/home.html'))
})


module.exports=userRoutes