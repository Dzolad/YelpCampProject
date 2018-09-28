// ============
// COMMENT ROUTES
// ============

// Requires & Router
let express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment");

// Show create new comment form
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

// Create new comment logic
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

// Middleware functions
function isLoggedIn(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
};

module.exports = router;