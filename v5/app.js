var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


/*Campground.create(
    {
    name: "The romantic campsite",
    image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg",
    description: "This romantic campsite is the perfect place to have some peaceful quality time with your soulmate."
    }, 
    function(err, campground){
        if(err){
            console.log(err);
        } else{
            console.log("Added a campground:")
            console.log(campground);
        }
    
});
*/

app.get("/", function(req,res){
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

app.get("/campgrounds", function(req, res){
    
    //get all campgrounds from DB
    Campground.find({}, function(err, allCamps){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/campgrounds", {campgrounds: allCamps});
        }
    });
});

app.post("/campgrounds", function(req,res){
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

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
});


// =================================
//          COMMENTS ROUTES
// =================================

app.get("/campgrounds/:id/comments/new", function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    });

});


app.post("/campgrounds/:id/comments", function(req,res){
    //lookup campground using ID
    //create new comment
    //connect new comment to campground
    //redirect to the show page
    
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp app is now running");
});