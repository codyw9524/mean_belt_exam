var User = require('./../controllers/Users');
var Poll = require('./../controllers/Polls');

module.exports = function(app){

	app.post('/users', User.create);

	app.get('/polls', Poll.index);

	app.post('/polls', Poll.create);

	app.delete('/polls/:id', Poll.destroy);

	app.get('/polls/:id', Poll.show);

	app.patch('/polls', Poll.update);
	
}