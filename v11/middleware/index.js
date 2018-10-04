/**
* @author : Manjeet Kumar
* @description : this file contains a few middleware function to handle authorization(ACL) and 
* authentication to certain resources (routes).
*/


var Campground  = require("../models/campground");
var Comment     = require("../models/comment");


// all the middleware goes here
var middlewareObj = {};

/**
* @description : this function applies authorization to certain routes. Checks if a particular user has the right to access a particular route.
*/
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, camp){
            if(err){
                req.flash("error", "campground not found");
                res.redirect("back");
            }else{
                //does the user own the campground?
                if(camp.author.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};


/**
* @description : this function applies authorization to certain routes. Ensures that a user can edit and delete comments that he added only.
*/
middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "comment not found");
                res.redirect("back");
            }else{
                //does the user own the campground?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};


/**
* @description : this function applies authentication to the application. Checks if the user is logged in or not.
*/
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};


module.exports = middlewareObj;