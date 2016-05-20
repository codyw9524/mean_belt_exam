myApp.factory('UserFactory', function($http){
	var factory = {};
	factory.current_user;
	factory.create = function(input, callback){
		factory.current_user = [];
		$http.post('/users', input).success(function(output){
			console.log('output:', output)
			factory.current_user = output;
			console.log('f_c_u:', factory.current_user);
			callback();
		})
	}
	return factory;
})

myApp.factory('PollFactory', function($http, $routeParams){
	var factory = {};
	factory.polls;
	factory.index = function(callback){
		$http.get('/polls').success(callback);
	}
	factory.create = function(input, callback){
		$http.post('/polls', input).success(callback);
	}
	factory.show = function(callback){
		$http.get('/polls/' + $routeParams.id).success(callback);
	}
	factory.updateVote = function(input, callback){
		$http.patch('/polls/', input).success(callback);
	}
	factory.destroy = function(input, callback){
		$http.delete('/polls/' + input._id).success(callback);
	}
	return factory;
})