var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
        name: "Cloud's Rest",
        image: "https://farm3.staticflickr.com/2655/3738566424_180036be3f.jpg",
        description: "cha cha cha" 
    },
    {
        name: "Beach campsite",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "cha cha cha"
    },
    {
        name: "Romantic Camping",
        image: "https://farm7.staticflickr.com/6085/6037590541_19248d41f0.jpg",
        description: "cha cha cha"
    }]

function seedDB(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        
        console.log("removed");
        
       // add new campgrounds(sample) 
        data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
            if(err){
                console.log(err)
            }
            console.log("campground added");
            
            Comment.create(
                {
                    text: "This place is great but I wish there was internet.",
                    author: "Loafer"
                }, function(err,comment){
                    if(err){
                        console.log(err);
                    }else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("added a new comment");
                    }
                }
            );
        });
    });
    });
    
}

module.exports = seedDB;