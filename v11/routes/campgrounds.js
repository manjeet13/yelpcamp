var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");


//INDEX show all campgrounds
router.get("/", function(req, res){
    
    //get all campgrounds from DB
    Campground.find({}, function(err, allCamps){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/campgrounds", {campgrounds: allCamps, currentUser: req.user});
        }
    });
});


//CREATE add new campground to DB
router.post("/", middleware.isLoggedIn, function(req,res){
    //extract the name and image from the form
    var name            = req.body.name;
    var image           = req.body.image;
    var desc            = req.body.description;
    var price           = req.body.price;
    var author          = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, price: price, author: author};
    //create new campground and save to DB
    Campground.create(newCampground, function(err, newCamp){
        if(err){
            console.log(err);
        } else{
            //redirect to the campgrounds page
            res.redirect("campgrounds");
        }
    });
    
    
});


//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});


//SHOW - show more info about campground
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
});

//EDIT route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id, function(err, camp){
            res.render("campgrounds/edit",{campground: camp});
        });
});

//UPDATE route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if(err){
            res.redirect("/campgrounds");
        }else{
            //redirect somewhere(show page)
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    
});

//DESTROY campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;