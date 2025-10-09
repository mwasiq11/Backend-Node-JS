const { check, validationResult } = require("express-validator");
const bcrypt=require('bcrypt')
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
    errors:[],
    oldInput:{email:""}
  });
};
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: { username: "", email: "", password: "", userType: "" },
  });
};
// exports.postSignup = [
//   check("username")
//     .trim()
//     .isLength({ min: 2 })
//     .withMessage("Username must have at least 2 characters")
//     .matches(/^[A-Za-z\s]+$/)
//     .withMessage("Username must contain only alphabets"),

//   check("email")
//     .isEmail()
//     .withMessage("Please enter a valid email")
//     .normalizeEmail(),

//   check("password")
//     .isLength({ min: 8 })
//     .withMessage("Password should be at least 8 characters long")
//     .matches(/[A-Z]/)
//     .withMessage("Password should contain at least one uppercase letter")
//     .matches(/[a-z]/)
//     .withMessage("Password should contain at least one lowercase letter")
//     .matches(/[0-9]/)
//     .withMessage("Password should contain at least one number")
//     .matches(/[!@&]/)
//     .withMessage("Password should contain at least one special character")
//     .trim(),

//   check("confirmPassword")
//     .trim()
//     .custom((value, { req }) => {
//       if (value !== req.body.password) {
//         throw new Error("Passwords do not match");
//       }
//       return true;
//     }),

//   check("userType")
//     .notEmpty()
//     .withMessage("Please select a user type")
//     .isIn(["guest", "host"])
//     .withMessage("Invalid user type"),

//   check("terms").custom((value) => {
//     if (value !== "on") {
//       throw new Error("Please accept the terms and conditions");
//     }
//     return true;
//   }),

//   // Final middleware that runs after validation
//   (req, res, next) => {
//     const { username, email, password, userType } = req.body;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).render("auth/signup", {
//         pageTitle: "Signup",
//         currentPage: "signup",
//         isLoggedIn: false,
//         errors: errors.array().map((err) => err.msg),
//         oldInput: { username, email, password, userType },
//       });
//     }
//     return bcrypt.hash(password,12).then(hashedPassword=>{
//     const user = new User({
//       username:username,
//       email:email,
//       password:hashedPassword,
//       userType:userType
//          });
//     return user.save()
//     })   
//       .then(() => {
//         res.redirect("/login");
//       })
//       .catch((err) => {
//         return res.status(422).render("auth/signup", {
//           pageTitle: "Signup",
//           currentPage: "signup",
//           isLoggedIn: false,
//           errors: [err.message],
//           oldInput: { username, email, password, userType },
//         });
//       });
     
//   },
// ];

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
    .isIn(["Guest", "Host"])
    .withMessage("Invalid user type"),

  check("terms").custom((value) => {
    if (value !== "on") {
      throw new Error("Please accept the terms and conditions");
    }
    return true;
  }),

  //  Final Middleware
  (req, res, next) => {
  const { username, email, password, userType } = req.body;
  const errors = validationResult(req);

  console.log(" Signup Request Body:", req.body);

  if (!errors.isEmpty()) {
    console.log(" Validation failed:", errors.array());
    return res.status(422).render("auth/signup", {
      pageTitle: "Signup",
      currentPage: "signup",
      isLoggedIn: false,
      errors: errors.array().map((err) => err.msg),
      oldInput: { username, email, password, userType },
    });
  }

  console.log(" Validation passed, hashing password...");

  return bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      console.log(" Password hashed, saving user...");

      const user = new User({
        username,
        email,
        password: hashedPassword,
        userType,
      });

      return user.save();
    })
    .then(() => {
      console.log(" User saved successfully, redirecting to /login...");
      return res.redirect("/login");
    })
    .catch((err) => {
      console.error(" Signup error:", err);
      res.status(500).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: [err.message],
        oldInput: { username, email, password, userType },
      });
    });
}
];


exports.postLogin = async (req, res, next) => {
  const {email,password}=req.body
  const user= await User.findOne({email});
  if (!user) {
    res.status(402).render('auth/login',{
     pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["User does not exist"],
      oldInput: {email},
      user: {},
    })
  }
  const isMatch=bcrypt.compare(password,user.password)
  if (!isMatch) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Invalid Password"],
      oldInput: {email},
      user: {},
    })
  }
  req.session.isLoggedIn=true;
  req.session.user=user;
  await req.session.save();

  res.render("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
