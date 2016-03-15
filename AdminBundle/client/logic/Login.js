Template.Login.events({
    'submit #login': function(event) {
	event.preventDefault();
	if (event.target.username.value == null ||
	    event.target.password.value == null) {
	    alert("Error: Empty field(s)");
	    return null;
	}

	if (event.target.username.value == "admin" && event.target.password.value == "admin") {
	    Session.setAuth('userToken', "token");
	} else {
	    alert("Error: Login failed");
	    return null;
	}
	
	// Meteor.call('LoginRequest', event.target.username.value, event.target.password.value, function(error, res) {
	//     if (!error && res) {
	//     	Session.setAuth('userToken', res.token);
	//     } else {
	//     	alert("Error: Login failed");
	// 	return null;
	//     }
	// });
    }
});

Template.SideNav.events({
    'click #logout': function(event) {
        Session.clearAuth();
	window.location.replace("/");
    }
});
