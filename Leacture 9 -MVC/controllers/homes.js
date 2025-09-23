const Home = require('../models/home')

exports.getAddhome = (req, res, next) => {
  res.render('addHome', { pageTitle: 'Add Home to airbnb' });
}

exports.postHomeAdded = (req, res, next) => {
  console.log('Home Registration successful for:', req.body, req.body.houseName);

  const houseName = req.body.houseName; 
  const home = new Home(houseName);   
  home.save();

  res.render('homeAdded', { pageTitle: 'Home Added Successfully' });
}

exports.gethomePage = (req, res, next) => {
 const registeredHomes=Home.fetchAll((registeredHomes)=>{
  res.render('home', { registeredHomes, pageTitle: 'airbnb Home' });
 });
  
}



