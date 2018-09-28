let mongoose   = require("mongoose"),
	Campground = require("./models/campground");
	Comment    = require("./models/comment")

let data = [
	{
		name: "Cloud's Rest",
		image: "https://pixabay.com/get/eb31b00e28f2083ed1584d05fb1d4e97e07ee3d21cac104496f6c570a1e8b3be_340.jpg",
		description: "Watch over the clouds at the highest campground on the planet!"
	},
	{
		name: "Sandy Dunes",
		image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
		description: "Sand everywhere!"
	},
	{
		name: "Swamp Land",
		image: "https://farm4.staticflickr.com/3313/3631530412_09d7409a09.jpg",
		description: "Go mosquito hunting all day every day!"
	}
];

function seedDB(){
	// Remove all campgrounds
	Campground.deleteMany({}, function(err){
		if (err) {
			console.log(err);
		} else {
			console.log("Removed campgrounds!");
			// Add a few campgrounds
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if (err) {
						console.log(err);
					} else {
						console.log("Added a campground");
						// Add a few comments
						Comment.create(
							{
								text: "This place is great, but I wish there was internet",
								author: "Homer"
							}, function(err, comment){
								if (err) {
									console.log(err);
								} else {
									campground.comments.push(comment);
									campground.save();
									console.log("Created a new comment");
								}
							});
					}
				})
			});
		}
	});
};

module.exports = seedDB;
