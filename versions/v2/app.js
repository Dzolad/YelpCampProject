let express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETTUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
			res.render("index", {campgrounds: campgrounds});
		}
	});
});

// CREATE
app.post("/campgrounds", function(req, res) {
	// Get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description: description};
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

// NEW
app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

// SHOW
app.get("/campgrounds/:id", function(req, res) {
	// Find campground with provided id
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render("show", {campground: foundCampground});
		}
	});
})

app.listen(8888, "127.0.0.1", function() {
	console.log("YelpCamp server has started!");
});