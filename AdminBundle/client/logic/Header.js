Template.Header.events({
    'click .sidebar-toggle': function(event, template) {
	if (($(document).width()) > 765) {
	    $('body').toggleClass('sidebar-collapse');
	    $('body').removeClass('sidebar-open');
	} else {
	    $('body').toggleClass('sidebar-open');
	    $('body').removeClass('sidebar-collapse');
	}
    }
});
