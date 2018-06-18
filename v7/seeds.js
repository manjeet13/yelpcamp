var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
        name: "Cloud's Rest",
        image: "https://farm3.staticflickr.com/2655/3738566424_180036be3f.jpg",
        description: "Sed iaculis laoreet enim, quis fringilla lacus venenatis sit amet. Duis faucibus, ligula a vehicula malesuada, justo leo laoreet velit, vel sollicitudin mauris massa eget ante. Sed ut dapibus metus. In iaculis, orci nec convallis fringilla, elit dui placerat erat, vel facilisis nibh mi eu sem. Aenean ultrices lacinia ante pharetra fringilla. Aliquam lorem ante, mattis a dolor ac, pellentesque malesuada nulla. Pellentesque non tellus augue. Fusce viverra in dui molestie cursus. Quisque mauris felis, luctus in urna et, mattis euismod metus. Curabitur vel lacus porttitor, vestibulum urna nec, interdum ligula." 
    },
    {
        name: "Beach campsite",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Sed iaculis laoreet enim, quis fringilla lacus venenatis sit amet. Duis faucibus, ligula a vehicula malesuada, justo leo laoreet velit, vel sollicitudin mauris massa eget ante. Sed ut dapibus metus. In iaculis, orci nec convallis fringilla, elit dui placerat erat, vel facilisis nibh mi eu sem. Aenean ultrices lacinia ante pharetra fringilla. Aliquam lorem ante, mattis a dolor ac, pellentesque malesuada nulla. Pellentesque non tellus augue. Fusce viverra in dui molestie cursus. Quisque mauris felis, luctus in urna et, mattis euismod metus. Curabitur vel lacus porttitor, vestibulum urna nec, interdum ligula."
    },
    {
        name: "Romantic Camping",
        image: "https://farm7.staticflickr.com/6085/6037590541_19248d41f0.jpg",
        description: "Sed iaculis laoreet enim, quis fringilla lacus venenatis sit amet. Duis faucibus, ligula a vehicula malesuada, justo leo laoreet velit, vel sollicitudin mauris massa eget ante. Sed ut dapibus metus. In iaculis, orci nec convallis fringilla, elit dui placerat erat, vel facilisis nibh mi eu sem. Aenean ultrices lacinia ante pharetra fringilla. Aliquam lorem ante, mattis a dolor ac, pellentesque malesuada nulla. Pellentesque non tellus augue. Fusce viverra in dui molestie cursus. Quisque mauris felis, luctus in urna et, mattis euismod metus. Curabitur vel lacus porttitor, vestibulum urna nec, interdum ligula."
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