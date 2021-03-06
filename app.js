
let express         = require("express"),
	app             = express(),
	bodyParser      = require("body-parser"),
	mongoose        = require("mongoose"),
	passport        = require("passport"),
	LocalStrategy   = require("passport-local"),
	methodOverride  = require("method-override"),
	Campground      = require("./models/campground"),
	Comment         = require("./models/comment"),
	User            = require("./models/user"),
	seedDB	        = require("./seeds");

// Route requires
let commentRoutes    = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes      = require("./routes/index")


mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// seedDB(); // Seed the Database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Dogs are the best animals!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// SESSIONS - USER 
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// Declare port and IP
app.listen(8888, "127.0.0.1", function() {
	console.log("YelpCamp server has started!");
});