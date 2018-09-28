let express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	Campground = require("./models/campground"),
	Comment    = require("./models/comment"),
	seedDB	   = require("./seeds");


seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("landing");
});

// INDEX
app.get("/campgrounds", function(req, res) {
	// Get all campgrounds from DB
	Campground.find({}, function(err, campgrounds){
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

// CREATE
app.post("/campgrounds", function(req, res) {
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

// NEW
app.get("/campgrounds/new", function(req, res) {
	res.render("campgrounds/new");
});

// SHOW
app.get("/campgrounds/:id", function(req, res) {
	// Find campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
})

// ============
// COMMENT ROUTES
// ============

app.get("/campgrounds/:id/comments/new", function(req, res){
	// Find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

app.post("/campgrounds/:id/comments", function(req, res){
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

app.listen(8888, "127.0.0.1", function() {
	console.log("YelpCamp server has started!");
});