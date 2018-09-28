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
	    author = {
	    	id: req.user._id,
	    	username: req.user.username
	    },
	    newCampground = {name: name, image: image, description: description, author: author};
	// Create new campground and save to db
	Campground.create(newCampground, function(err, newlyCreated){
		if (err) {
			console.log(err);
		} else {
			// Redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

// NEW - Show create new campground form
router.get("/new", isLoggedIn, function(req, res) {
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

// EDIT - Specific campground show page
router.get("/:id/edit", checkCampgroundOwner, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else	{
			res.render("campgrounds/edit", {campground: foundCampground});
		}
	});
});

// UPDATE - Edited specific campground
router.put("/:id", checkCampgroundOwner, function(req, res){
	// Find and update correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// Redirect to showpage
			res.redirect("/campgrounds/" + req.params.id);
		}	
	});
});

// DELETE - Delete campground
router.delete("/:id", checkCampgroundOwner, function(req,res){
	Campground.findByIdAndDelete(req.params.id, function(err){
		console.log(err);
		res.redirect("/campgrounds");
	});
});

// Middleware functions
function isLoggedIn(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
};

function checkCampgroundOwner(req, res, next){
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground){
			if (err) {
				res.redirect("back");
			} else {
				// Does this user own this campground?
				if (foundCampground.author.id.equals(req.user._id)) {
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