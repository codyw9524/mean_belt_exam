myApp.controller('UsersController', function(UserFactory, $location){
	var self = this;
	this.create = function(input){
		UserFactory.create(input, function(){
			$location.path('/dashboard');
		})
	}
})

myApp.controller('PollsController', function(UserFactory, PollFactory, $location){
	var self = this;
	this.polls;
	this.poll;
	this.current_user;
	this.error;
	this.show = function(){
		PollFactory.show(function(data){
			self.poll = data;
		})
	}
	if($location.$$path.indexOf('poll') > 0){
		this.show();
	}
	this.index = function(){
		self.current_user = UserFactory.current_user;
		PollFactory.index(function(data){
			self.polls = data;
			for(i in self.polls){
				self.polls[i].formatted_date = moment(self.polls[i].created_at).format('MMMM Do, YYYY');
			}
		})
	}
	this.create = function(input){
		$("#question_err").html('');
		$("#option_1_err").html('');
		$("#option_2_err").html('');
		$("#option_3_err").html('');
		$("#option_4_err").html('');
		if(input === undefined){
			var html_str = "";
			html_str += '<p class="error">';
			html_str += "Please, do not submit a blank form.";
			html_str += '</p>';
			$("#option_4_err").html(html_str);
			return;
		}
		if(input['question'] === undefined){
			var html_str = "";
			html_str += '<p class="error">';
			html_str += "The question field must not be blank.";
			html_str += '</p>';
			$("#question_err").html(html_str);
			return;
		}
		if(input.question.length < 8){
			var html_str = "";
			html_str += '<p class="error">';
			html_str += "The question must be at least 8 characters in length.";
			html_str += '</p>';
			$("#question_err").html(html_str);
			return;
		}
		if(input['option_1'] === undefined){
			var html_str = "";
			html_str += '<p class="error">';
			html_str += "Option fields must not be blank.";
			html_str += '</p>';
			$("#option_1_err").html(html_str);
			return;
		}
		if(input.option_1.option.length < 3 || input.option_1 == false){
			var html_str = "";
			html_str += '<p class="error">';
			html_str += 'Option fields must be at least 3 characters in length.'
			html_str += '</p>';
			$("#option_1_err").html(html_str);
			return;
		}
		if(input['option_2'] === undefined){
			var html_str = "";
			html_str += '<p class="error">';
			html_str += "Option fields must not be blank.";
			html_str += '</p>';
			$("#option_2_err").html(html_str);
			return;
		}
		if(input.option_2.option.length < 3){
			var html_str = "";
			html_str += '<p class="error">';
			html_str += 'Option fields must be at least 3 characters in length.'
			html_str += '</p>';
			$("#option_2_err").html(html_str);
			return;
		}
		if(input['option_3'] === undefined){
			var html_str = "";
			html_str += '<p class="error">';
			html_str += "Option fields must not be blank.";
			html_str += '</p>';
			$("#option_3_err").html(html_str);
			return;
		}
		if(input.option_3.option.length < 3){
			var html_str = "";
			html_str += '<p class="error">';
			html_str += 'Option fields must be at least 3 characters in length.'
			html_str += '</p>';
			$("#option_3_err").html(html_str);
			return;
		}
		if(input['option_4'] === undefined){
			var html_str = "";
			html_str += '<p class="error">';
			html_str += "Option fields must not be blank.";
			html_str += '</p>';
			$("#option_4_err").html(html_str);
			return;
		}
		if(input.option_4.option.length < 3){
			var html_str = "";
			html_str += '<p class="error">';
			html_str += 'Option fields must be at least 3 characters in length.'
			html_str += '</p>';
			$("#option_4_err").html(html_str);
			return;
		}
		input._user = UserFactory.current_user[0]._id;
		PollFactory.create(input, function(){
			self.index();
			$location.path('/dashboard');
		})
	}
	this.updateVote = function(idx, poll_id){
		var data = {};
		data.name = idx;
		data.poll_id = poll_id;
		PollFactory.updateVote(data, self.show);
	}
	this.destroy = function(input){
		PollFactory.destroy(input, self.index);
	}
	this.index();
})