// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const multer=require('multer')
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_PATH="mongodb+srv://root:root00001@node.y1gwx8t.mongodb.net/?retryWrites=true&w=majority&appName=Node"

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// generate random string name for file
const randomString=(length)=>{
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result="";
  for(let i=0;i<length;i++){
    result+=characters.charAt(Math.floor(Math.random()*characters.length))
  }
  return result;

}
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    // this will make a folder named uploads and save all the uploads files
    cb(null,"uploads/")
  },
  filename:(req,file,cb)=>{
    cb(null,randomString(10) + '-' +filename.orginalname)
  }
})
// check the file type
const fileFilter=(req,file,cb)=>{
  if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg')
    {
    cb(null,true);
    }
  else {
    cb(null,false);
   }
}
const multerStorage={
  storage,fileFilter
}
// use of multer to handle multipart/form-data
app.use(multer(multerStorage).single('photo'))
app.use(session({
  secret: "airbnb",
  resave: false,
  saveUninitialized: true,
  store
}));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn
  next();
})

app.use(authRouter)
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3003;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
