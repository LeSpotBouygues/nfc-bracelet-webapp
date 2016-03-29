Template.Tasks.onRendered(function () {
    Meteor.call('TasksListRequest', function(error, res) {
    	if (!error && res) {
    	   Session.set('companions', res);
    	}	
    });


});
