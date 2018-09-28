// Requires & Router
let express = require("express"),
    router  = express.Router();
    Campground = require("../models/campground");

// INDEX - Overview Screen
router.get("/", function(req, res) {
	// Get all campgrounds from DB
	Campground.find({}, function(err, campgrounds){
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

// CREATE - Handle create new post logic
router.post("/", isLoggedIn, function(req, res) {
	// Get data from form and add to campgrounds array
	let name = req.body.name,
	    image = req.body.image,
	    description = req.body.description,
	    comments = req.body.comments,
	    newCampground = {name: name, image: image, description: description, comments: comments};
	// Create new campground and save to db
	Campground.create(newCampground, function(err, newlyCreated){
		if (err) {
			console.log(err);
		} else {
			// Redirect back to campgrounds page
			res.redirect("campgrounds");
		}
	});
});

// NEW - Show create new campground form
router.get("/new", function(req, res) {
	res.render("campgrounds/new");
});

// SHOW - Specific campground show page
router.get("/:id", function(req, res) {
	// Find campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundCampground});
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