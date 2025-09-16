const express=require('express')
const app=express()
// middleware to connect app with server
app.use((req,res,next)=>{
	console.log("first middleware",req.url,req.method);
	res.send("<p>Learning Express JS</p>")
	next();
})
app.use((req,res,next)=>{
	console.log("second middleware",req.url,req.method);
	next();
})
const PORT=3000;
app.listen(PORT,()=>{
	console.log(`server running http://localhost:${PORT}`)
})