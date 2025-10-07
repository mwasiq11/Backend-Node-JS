const {check,validationResult} = require("express-validator");
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
  });
};
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors:[],
    oldInput:{username:"",email:"",password:"",userType:""}
  });
};
exports.postSignup = [
  check("username")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Username must have at least 2 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Username must contain only alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password should contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain at least one number")
    .matches(/[!@&]/)
    .withMessage("Password should contain at least one special character")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  check("terms")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("Please accept the terms and conditions");
      }
      return true;
    }),

  // Final middleware that runs after validation
  (req, res, next) => {
    const {username,email,password,userType}=req.body;
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(422).render('auth/signup',{
        pageTitle:'Signup',
        currentPage:'signup',
        isLoggedIn:false,
        errors:errors.array().map(err=>err.msg),
        oldInput:{username,email,password,userType}

      })
    }
    res.redirect('/login')
   
  },
];

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true;
  //res.cookie("isLoggedIn", true);
  //req.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
