// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Idea', {
	title : {type : String, default: ''},
    tags : {type : String, default: ''},
    idea : {type : String, default: ''},
    creator : {type : String, default: ''}
});
