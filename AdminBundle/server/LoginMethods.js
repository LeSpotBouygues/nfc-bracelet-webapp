Meteor.methods({
    LoginRequest: function(username, password) {
	var url = "http://ec2-54-86-80-245.compute-1.amazonaws.com:3000/login";
	try {
	    var res = HTTP.call('POST', url, {
		auth: username + ":" + password
	    });
	    return JSON.parse(res.content);
	} catch (e) {
	    return false;
	}
    }
});
