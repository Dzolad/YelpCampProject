let mongoose = require("mongoose");
	
// COMMENT SCHEMA SETUP
let commentSchema = new mongoose.Schema({
	text: String,
	author: String
});

module.exports = mongoose.model("Comment", commentSchema);