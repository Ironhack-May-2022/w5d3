const router = require("express").Router();

// this is a middleware that checks if the user is logged in
const loginCheck = () => {
  return (req, res, next) => {
    // check for a logged in user
    if (req.session.user !== undefined) {
      // the user is logged in -> they can visit the page 
      // that they requested
      next()
    } else {
      // the user is not logged in 
      // we redirect to login
      res.redirect('/login')
    }
  }
}


/* GET home page */
router.get("/", (req, res, next) => {
  // console.log(req.session.user)
  res.render("index");
});

// here the middleware is attached
// this route is now protected
router.get("/profile", loginCheck(), (req, res, next) => {
  // console.log(req.session)
  // this is how you can set a cookie
  // res.cookie('myCookie', 'hello from the server')
  // to clear the cookie in the browser
  res.clearCookie('myCookie')
  res.render("profile");
});

module.exports = router;
