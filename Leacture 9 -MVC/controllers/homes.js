const registeredHomes = [];
exports.getAddhome= (req, res, next) => {
  res.render('addHome', {pageTitle: 'Add Home to airbnb'});
}
 exports.postHomeAdded=(req, res, next) => {
  console.log('Home Registration successful for:', req.body, req.body.houseName);
  registeredHomes.push({houseName: req.body.houseName});
  res.render('homeAdded', {pageTitle: 'Home Added Successfully'});
}

exports.gethomePage=(req, res, next) => {
  console.log(registeredHomes);
  res.render('home', {registeredHomes: registeredHomes, pageTitle: 'airbnb Home'});
};


exports.registeredHomes=registeredHomes;