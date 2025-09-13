console.log("hello")
const fs=require("fs")
fs.writeFile("output.txt","file writing",(error)=>{
	if (error) {	
	console.log("error")
	}
	else{
		console.log("successfully run the file")
	}
})