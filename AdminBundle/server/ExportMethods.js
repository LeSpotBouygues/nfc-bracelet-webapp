Meteor.methods({
    Export: function(vStart, vEnd) {
	var url = urlApi + "/export";
	try {	    
	    var res = HTTP.call('POST', url, {
		data: {
		    start: vStart,
		    end: vEnd
		}
	    });
	    return JSON.parse(res.content);
	} catch (e) {
	    console.log(e);
	    return false;
	}
    },

    CompanionsImport: function(form) {
	var url = urlApi + "/companions/importData";
	try {
	    // console.log(file);
	    var res = HTTP.post(url, {
		headers: {
		    "contentType": false,
		    "mimeType": "multipart/form-data",
		},


		data: form
	    });
	    return JSON.parse(res.content);
	} catch (e) {
	    console.log(e);
	    return false;
	}
    }
});
