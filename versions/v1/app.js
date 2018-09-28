var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
	{name:"Salmon Creek", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f5c271a4e4b0b8_340.jpg"},
	{name:"Salmon Bay", image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f5c271a4e4b0b8_340.jpg"},
	{name:"Salmon Beach", image:"https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f5c271a4e4b0b8_340.jpg"}
];

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	

	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
	// Get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	// Redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

app.listen(8888, "127.0.0.1", function(){
	console.log("YelpCamp server has started!");
});