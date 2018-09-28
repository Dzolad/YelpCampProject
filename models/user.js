let mongoose = require("mongoose");
	passportLocalMongoose = require("passport-local-mongoose");
	
// COMMENT SCHEMA SETUP
let UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);