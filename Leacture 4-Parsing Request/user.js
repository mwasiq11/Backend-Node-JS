const http = require("http");
const fs=require('fs')
const { URLSearchParams } = require("url");
const { error } = require("console");
const requestHandler=(req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Learning Node JS</title></head>");
    res.write("<body><h1>Enter Your Details:</h1>");
    res.write('<form action="/submit-details" method="POST">');
    res.write(
      '<input type="text" name="username" placeholder="Enter your name"><br>'
    );
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="male" name="gender" value="male" />');
    res.write('<label for="female">Female</label>');
    res.write(
      '<input type="radio" id="female" name="gender" value="female" />'
    );
    res.write('<br><input type="submit" value="Submit">');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (
    req.url.toLowerCase() === "/submit-details" &&
    req.method == "POST"
  ) {
    const body = [];
    req.on("data", (chunks) => {
      console.log("chunks:", chunks); // chucks small pieces of codes
      body.push(chunks);
    });
    // tells that requests ended
		// this is encoded data format
    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
			// this is decoded data format
      const params = new URLSearchParams(fullBody);
      // const ObjectBody={}
      // for(let [key,values]of params.entries((ObjectBody))){
      // 	ObjectBody[key]=values
      // }			
      const ObjectBody = Object.fromEntries(params);
      console.log(ObjectBody);
			// write on file
			fs.writeFile('user.txt',JSON.stringify(ObjectBody),(error)=>{
        console.log("error:",error);
      })
    });
  }
};


module.exports=requestHandler