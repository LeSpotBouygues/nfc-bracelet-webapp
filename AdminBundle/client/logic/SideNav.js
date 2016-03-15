Template.SideNav.events({
	'click .logout': function(event) {
		Session.clearAuth();
	}
});