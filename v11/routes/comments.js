/**
* @author: Manjeet Kumar
* @description : this is the comment route file which handles CRUD operations regarding comments.
*/


var express     = require("express");
var router      = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

// =================================
//          COMMENTS ROUTES
// =================================


/**
* @description : get route which opens a new comment page for adding a comment to a campgroud
*/
router.get("/new", middleware.isLoggedIn, function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    });

});


/**
* @description : post route which adds a new comment to a campgroud and also saves it into db
*/
router.post("/", middleware.isLoggedIn, function(req,res){
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
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save the comment
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("Success", "Successfully added comment");
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    });
});


/**
* @description : route which opens the page where a comment can be edited. Only the author of the comment has the edit access.
*/
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit",{campground_id: req.params.id, comment: foundComment});
        }
    });
    
});


//UPDATE comment
/**
* @description : route which updates the comment on page after it has been edited and submitted.
*/
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    //find and update
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});


//DESTROY comment
/**
* @description : route which handles the deletion of a comment. Only the author of the comment has the delete access.
*/
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            res.redirect("/campgrounds/"+req.params.id);
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});


module.exports = router;