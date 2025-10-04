// Core Module
const path = require("path");

// External Module
const express = require("express");

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require("mongoose");
const authRouter=require('./routes/authRouter')

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({"extended":true}));
app.use((req,res,next)=>{
  console.log("in the middleware");
  req.isLoggedIn=req.get('Cookie')? req.get('Cookie').split("=")[1]==='true':false;
  next();
})
app.use((req,res,next)=>{
  req.isLoggedIn=req.session.isLoggedIn;
  next();
})
app.use(storeRouter);
app.use(authRouter)
app.use("/host", (req,res,next)=>{
  if(req.isLoggedIn){
    next();
  }
    else{
      res.redirect("/login");
    }
  
});

app.use(express.static(path.join(rootDir, "public")));

app.use(errorsController.pageNotFound);

// Mongoose connected
const PORT = 3000;
const DB_PATH="mongodb+srv://root:root00001@node.y1gwx8t.mongodb.net/?retryWrites=true&w=majority&appName=Node"
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("moongose connected");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("moongose not connected", error);
  });
