const express=require('express')
const hostRoutes=express.Router()
// core module
const path=require('path')
const rootDir=require('../utils/pathUtils')

hostRoutes.get("/add-home",(req,res,next)=>{

	res.sendFile(path.join(rootDir,'views','/addhome.html'))

});
hostRoutes.post("/add-home",(req,res,next)=>{
	res.sendFile(path.join(rootDir,'views','/homeAdded.html'))
})

module.exports=hostRoutes;