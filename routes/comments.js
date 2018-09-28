// ============
// COMMENT ROUTES
// ============

// Requires & Router
let express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment");

// CREATE - Show create new comment form
router.get("/new", isLoggedIn, function(req, res){
	// Find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

// NEW - Create new comment logic
router.post("/", function(req, res){
	// Lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds")
		} else {
			// Create new comment
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					console.log(err);
					res.redirect("/campgrounds")
				} else {
					// Add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					// Connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					// Redirect to campground show page
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

// EDIT - Show form for editing comments
router.get("/:comment_id/edit", checkCommentOwner, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if (err) {
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
});

// UPDATE - Update comment logic
router.put("/:comment_id", checkCommentOwner, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if (err) {
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DELETE - Delete comment
router.delete("/:comment_id", checkCommentOwner, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// Middleware functions
function isLoggedIn(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
};

function checkCommentOwner(req, res, next){
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if (err) {
				res.redirect("back");
			} else {
				// Does this user own this campground?
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
}

module.exports = router;