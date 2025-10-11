// Core Module
const path = require('path');

// External Module
const express = require('express');
const session=require('express-session');
const errorsController=require('./controllers/errors')
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_PATH="mongodb+srv://root:root00001@node.y1gwx8t.mongodb.net/?retryWrites=true&w=majority&appName=Node"

//Local Module
const rootDir = require("./utils/pathUtil");
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


app.use(express.static(path.join(rootDir, 'public')));
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
