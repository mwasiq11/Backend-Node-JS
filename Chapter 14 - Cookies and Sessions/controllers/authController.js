// controllers/authController.js
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};
exports.postLogin=(req,res,next)=>{
	console.log(req.body);
	req.cookie("isLoggedIn",true)
	res.redirect("/");

}
