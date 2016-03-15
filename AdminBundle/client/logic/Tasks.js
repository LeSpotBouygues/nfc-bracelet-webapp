Template.Tasks.onRendered(function () {
    Meteor.call('TasksListRequest', function(error, res) {	    
    	console.log(res);
    	if (!error && res) {
	    // Session.set('companionsCurrentPage', 1);
	    // Session.set('companionsPerPage', 10);
	    // Session.set('companionsNb', res.length);

    	    return Session.set('companions', res);
    	}	
    });


});
