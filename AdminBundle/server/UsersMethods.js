Meteor.methods({
	usersRequest: function(token, begin, count) {
		var url = "http://indigo-dev.myprojekts.fr/admin/user/getall/" + begin + "/" + count;
		console.log(url);
		var token = "Bearer " + token;
		try {
			var res = HTTP.get(url, {
				headers: {Authorization: token}
			});
			console.log(res.data.result);
			return res;
		} catch (e) {
			verif(e.response.data.error.code, e.response.data.error.message);
			return null;
		}
	}
});