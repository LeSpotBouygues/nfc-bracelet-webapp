Template.Export.onRendered(function () {
    $('#dateStart').datepicker({
	format: "yyyy:mm:dd"
    });
    $('#dateEnd').datepicker({
	format: "yyyy:mm:dd"
    });
});


Template.Export.events({
    'submit #export': function(event) {
	event.preventDefault();
	if (event.target.dateStart.value == '' || event.target.dateEnd.value == '') {
	    alert("Error: Empty field(s)");
	    return null;
	}

	Meteor.call('Export', event.target.dateStart.value, event.target.dateEnd.value,
		    function(error, res) {
			if (!error && res) {
			    event.target.dateStart.value = '';
			    event.target.dateEnd.value = '';
	    		    alert("Success: Exported files");
			    
			    for (i = 0; i < res.urls.length; i++) {
				var win = window.open(res.urls[i], '_blank');
			    }
			    window.focus();
			    
			} else {
	    		    alert("Error: The Exportation has failed");
			    return null;
			}
		    });
	
    }
});
