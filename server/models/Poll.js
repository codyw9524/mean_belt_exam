var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
	question: String,
	option_1: {option: String, votes: {type: Number, default: 0}},
	option_2: {option: String, votes: {type: Number, default: 0}},
	option_3: {option: String, votes: {type: Number, default: 0}},
	option_4: {option: String, votes: {type: Number, default: 0}},
	created_at: {type: Date, default: new Date},
	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

var Poll = mongoose.model('Poll', PollSchema);