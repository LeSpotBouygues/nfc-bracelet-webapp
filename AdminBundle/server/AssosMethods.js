Meteor.methods({
	assosRequest: function(token, begin, count) {
		var url = "http://indigo-dev.myprojekts.fr/admin/assos/" + begin + "/" + count;
		console.log(url);
		var token = "Bearer " + token;
		try {
			var res = HTTP.get(url, {
				headers: {Authorization: token}
			});
			console.log(res.data.result);
			return res;
		} catch (e) {
			console.log(e);
			console.log(e.response);
			verif(e.response.data.error.code, e.response.data.error.message);
			return null;
		}
	}
});