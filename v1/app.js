var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("landing");
});

var campgrounds = [
        {name: "The Havana campsite", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
        {name: "The beach campsite", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "The romantic campsite", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
        {name: "The Havana campsite", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
        {name: "The beach campsite", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "The romantic campsite", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
        {name: "The Havana campsite", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
        {name: "The beach campsite", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "The romantic campsite", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"}
    ]

app.get("/campgrounds", function(req, res){
    
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res){
    //extract the name and image from the form
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    //push the new campground to the array
    campgrounds.push(newCampground);
    
    //redirect to the campgrounds page
    res.redirect("campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp app is now running");
});