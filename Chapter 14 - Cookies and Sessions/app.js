// Core Module
const path = require("path");

// External Module
const express = require("express");
<<<<<<< HEAD
const session=require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);
const DB_PATH="mongodb+srv://root:root00001@node.y1gwx8t.mongodb.net/?retryWrites=true&w=majority&appName=Node"
=======
>>>>>>> 867a29156e72c956f3f76d53e814a3f295307416

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require("mongoose");
const authRouter=require('./routes/authRouter')

<<<<<<< HEAD

=======
>>>>>>> 867a29156e72c956f3f76d53e814a3f295307416
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

<<<<<<< HEAD
const store=new MongoDBStore({
  uri:DB_PATH,
  collection:"sessions",
})

app.use(express.urlencoded({"extended":true}));
app.use(session({
  secret:"airbnb",
  resave:false,
  saveUninitialized:true,
  store:store,
}))
// global middleware
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.isLoggedIn || false;
  next();
});
app.use((req,res,next)=>{
=======
app.use(express.urlencoded({"extended":true}));
app.use((req,res,next)=>{
  console.log("in the middleware");
>>>>>>> 867a29156e72c956f3f76d53e814a3f295307416
  req.isLoggedIn=req.get('Cookie')? req.get('Cookie').split("=")[1]==='true':false;
  next();
})
app.use((req,res,next)=>{
<<<<<<< HEAD
  req.isLoggedIn=req.isLoggedIn;
  next();
})

=======
  req.isLoggedIn=req.session.isLoggedIn;
  next();
})
>>>>>>> 867a29156e72c956f3f76d53e814a3f295307416
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
<<<<<<< HEAD
=======
const DB_PATH="mongodb+srv://root:root00001@node.y1gwx8t.mongodb.net/?retryWrites=true&w=majority&appName=Node"
>>>>>>> 867a29156e72c956f3f76d53e814a3f295307416
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
