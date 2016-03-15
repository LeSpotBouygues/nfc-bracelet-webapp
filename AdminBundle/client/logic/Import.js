Template.Import.events({
    'submit #importCompanions': function(event, tmpl) {
	// event.preventDefault();

	// var fileInput = tmpl.find('input[type=file]');


	// var form = new FormData();
	// form.append("my_file", fileInput.files[0]);
	
	// Meteor.call('CompanionsImport', event.ta,
	// 	    function(error, res) {
	// 		if (!error && res) {
	// 		    event.target.fileCompanions.value = '';
	//     		    alert("Success: imported files");
	// 		} else {
	//     		    alert("Error: The importation of the companions has failed");
	// 		    return null;
	// 		}
	// 	    });
	
    },
});
