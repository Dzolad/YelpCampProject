let mongoose   = require("mongoose"),
	Campground = require("./models/campground");
	Comment    = require("./models/comment")

let data = [
	{
		name: "Cloud's Rest",
		image: "https://pixabay.com/get/eb31b00e28f2083ed1584d05fb1d4e97e07ee3d21cac104496f7c079a6e8bdbb_340.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit blandit ante vel aliquet. Integer ut tempor ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in accumsan purus. Cras dignissim tincidunt euismod. Ut venenatis cursus lorem. Proin condimentum nec velit vel posuere. Donec ac mi ac magna aliquam eleifend. Pellentesque mattis ut augue a bibendum. Sed gravida sollicitudin laoreet. Mauris molestie nibh sed augue ullamcorper, eu accumsan ex pharetra. Fusce in mattis elit. Duis et eros sed urna posuere aliquam. Donec in massa id metus fringilla iaculis. Ut consequat tortor sapien, vel consectetur eros ornare ac. Curabitur vitae semper augue, sed congue lorem. Aliquam erat volutpat. Donec quis lacus quis enim facilisis sollicitudin sit amet sit amet lectus. Praesent sit amet eros pharetra turpis suscipit finibus a tristique metus. Morbi elementum sapien eget tellus pharetra pharetra. Ut eget accumsan est. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In non nibh eu neque tincidunt fermentum. Phasellus molestie eget orci et accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque cursus tincidunt nibh, a dictum purus iaculis eget. Aliquam erat volutpat. Vivamus a eros aliquet, pharetra justo at, lobortis eros. Sed sed purus sit amet magna molestie tempor. Ut felis turpis, dapibus eget aliquet vitae, iaculis sit amet massa. Maecenas semper odio ex, sagittis dignissim eros consequat vitae. Donec tempus tortor dui, quis dignissim justo venenatis ut."
	},
	{
		name: "Sandy Dunes",
		image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit blandit ante vel aliquet. Integer ut tempor ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in accumsan purus. Cras dignissim tincidunt euismod. Ut venenatis cursus lorem. Proin condimentum nec velit vel posuere. Donec ac mi ac magna aliquam eleifend. Pellentesque mattis ut augue a bibendum. Sed gravida sollicitudin laoreet. Mauris molestie nibh sed augue ullamcorper, eu accumsan ex pharetra. Fusce in mattis elit. Duis et eros sed urna posuere aliquam. Donec in massa id metus fringilla iaculis. Ut consequat tortor sapien, vel consectetur eros ornare ac. Curabitur vitae semper augue, sed congue lorem. Aliquam erat volutpat. Donec quis lacus quis enim facilisis sollicitudin sit amet sit amet lectus. Praesent sit amet eros pharetra turpis suscipit finibus a tristique metus. Morbi elementum sapien eget tellus pharetra pharetra. Ut eget accumsan est. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In non nibh eu neque tincidunt fermentum. Phasellus molestie eget orci et accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque cursus tincidunt nibh, a dictum purus iaculis eget. Aliquam erat volutpat. Vivamus a eros aliquet, pharetra justo at, lobortis eros. Sed sed purus sit amet magna molestie tempor. Ut felis turpis, dapibus eget aliquet vitae, iaculis sit amet massa. Maecenas semper odio ex, sagittis dignissim eros consequat vitae. Donec tempus tortor dui, quis dignissim justo venenatis ut."
	},
	{
		name: "Swamp Land",
		image: "https://farm4.staticflickr.com/3313/3631530412_09d7409a09.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit blandit ante vel aliquet. Integer ut tempor ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in accumsan purus. Cras dignissim tincidunt euismod. Ut venenatis cursus lorem. Proin condimentum nec velit vel posuere. Donec ac mi ac magna aliquam eleifend. Pellentesque mattis ut augue a bibendum. Sed gravida sollicitudin laoreet. Mauris molestie nibh sed augue ullamcorper, eu accumsan ex pharetra. Fusce in mattis elit. Duis et eros sed urna posuere aliquam. Donec in massa id metus fringilla iaculis. Ut consequat tortor sapien, vel consectetur eros ornare ac. Curabitur vitae semper augue, sed congue lorem. Aliquam erat volutpat. Donec quis lacus quis enim facilisis sollicitudin sit amet sit amet lectus. Praesent sit amet eros pharetra turpis suscipit finibus a tristique metus. Morbi elementum sapien eget tellus pharetra pharetra. Ut eget accumsan est. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In non nibh eu neque tincidunt fermentum. Phasellus molestie eget orci et accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque cursus tincidunt nibh, a dictum purus iaculis eget. Aliquam erat volutpat. Vivamus a eros aliquet, pharetra justo at, lobortis eros. Sed sed purus sit amet magna molestie tempor. Ut felis turpis, dapibus eget aliquet vitae, iaculis sit amet massa. Maecenas semper odio ex, sagittis dignissim eros consequat vitae. Donec tempus tortor dui, quis dignissim justo venenatis ut."
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
						Comment.deleteMany({}, function(err){
							console.log("Deleted comments");
							Comment.create({
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
								}
							);
						});
					}
				})
			});
		}
	});
};

module.exports = seedDB;
