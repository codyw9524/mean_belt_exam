var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
	created_at: {type: Date, default: new Date},
	polls: [{type: mongoose.Schema.Types.ObjectId, ref: 'Poll'}]
})

var User = mongoose.model('User', UserSchema);