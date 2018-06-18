var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");


//requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes          = require("./routes/index");           //auth routes

mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//seedDB();         //seed the data base

app.use(require("express-session")({
    secret: "Chelsea till I die",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//logic to show relevant login/signup/logout links up top
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

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

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//initialize server on PORT
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp app is now running");
});