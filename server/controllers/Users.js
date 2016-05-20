var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
	create: function(req, res){
		User.find({name: req.body.name}, function(err, doc){
			if(err){
				console.log(err);
			}
			else if(doc.length > 0){
				res.json(doc);
			}
			else{
				var user = new User(req.body);
				user.save(function(err, user2){
					if(err){
						console.log(err);
					}
					else{
						console.log(user2);
						res.json(user2);
					}
				})
			}
		})
	}
}