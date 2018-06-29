var express = require("express");
var router  = express.Router()
var passport = require("passport");
var User    = require("../models/user");


router.get("/", function(req,res){
    res.render("landing");
});

/* var campgrounds = [
        {name: "The Havana campsite", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
        {name: "The beach campsite", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "The romantic campsite", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
        {name: "The Havana campsite", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
        {name: "The beach campsite", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "The romantic campsite", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
        {name: "The Havana campsite", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
        {name: "The beach campsite", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "The romantic campsite", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"}
    ];
*/







//================================
//          AUTH ROUTES
//================================

//sign up
router.get("/register", function(req, res) {
    res.render("register");
});


router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp!");
            res.redirect("/campgrounds");
        });
    });
});


//login form
router.get("/login", function(req, res) {
    res.render("login");
});


//handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {

});



//logout
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;