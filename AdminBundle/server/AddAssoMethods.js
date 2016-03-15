Meteor.methods({
	createAsso: function(token, vars) {
		var url = "http://indigo-dev.myprojekts.fr/admin/assos/";
		try {
			var res = HTTP.call('POST', url, {
				headers:{Authorization: "Bearer " + token},
				params: {
					"name": vars.name,
					"description": vars.description,
				}
		    });
		    console.log(res.data.response_message);
		} catch (e) {
			verif(e.response.data.error.code, e.response.data.error.message);
		}
	}
});