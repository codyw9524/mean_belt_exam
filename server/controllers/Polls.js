var mongoose = require('mongoose');
var User = mongoose.model('User');
var Poll = mongoose.model('Poll');

module.exports = {
	index: function(req, res){
		Poll.find({}).populate('_user').exec(function(err, doc){
			if(err){
				console.log(err);
			}
			else{
				res.json(doc)
			}
		})
	},
	create: function(req, res){
		User.findById(req.body._user, function(err, user){
			if(err){
				console.log(err);
			}
			else{
				var poll = new Poll(req.body);
				poll.save(function(err, poll){
					if(err){
						console.log(err);
					}
					else{
						user.polls.push(poll);
						user.save(function(err, user){
							if(err){
								console.log(err);
							}
							else{
								res.json(poll);
							}
						})
					}
				})
			}
		})
	},
	destroy: function(req, res){
		Poll.remove({_id: req.params.id}, function(err, doc){
			if(err){
				console.log(err);
			}
			else{
				res.json(doc);
			}
		})
	},
	show: function(req, res){
		Poll.findById(req.params.id, function(err, doc){
			if(err){
				console.log(err);
			}
			else{
				res.json(doc);
			}
		})
	},
	update: function(req, res){
		Poll.findById(req.body.poll_id, function(err, doc){
			if(err){
				console.log(err);
			}
			else{
				if(doc[req.body.name]){
					doc[req.body.name].votes++;
					doc.save(function(err, doc){
						if(err){
							console.log(err);
						}
						else{
							res.json(doc);
						}
					})
				}
			}
		})
	}
}




