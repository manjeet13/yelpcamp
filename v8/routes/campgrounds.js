var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");



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
router.post("/", function(req,res){
    //extract the name and image from the form
    var name          = req.body.name;
    var image         = req.body.image;
    var desc          = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //push the new campground to the array
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
router.get("/new", function(req, res) {
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


module.exports = router;