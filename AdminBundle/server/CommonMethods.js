Meteor.startup(function() {
	verif = function(code, message) {	
		console.log(code);
		console.log(message);
		return ("Error code: " + code + ": " + message);
	}
});

