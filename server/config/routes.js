var User = require('./../controllers/users');
var Poll = require('./../controllers/polls');

module.exports = function(app){

	app.post('/users', User.create);

	app.get('/polls', Poll.index);

	app.post('/polls', Poll.create);

	app.delete('/polls/:id', Poll.destroy);

	app.get('/polls/:id', Poll.show);

	app.patch('/polls', Poll.update);
	
}