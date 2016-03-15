Meteor.methods({
	singleUserRequest: function(token, id) {
		var url = "http://indigo-dev.myprojekts.fr/user/" + id;
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
	},
	creditUserRequest: function(token, digos, userId) {
		var url = "http://indigo-dev.myprojekts.fr/admin/credit/" + userId;
		console.log(url);
		try {
			var res = HTTP.call('POST', url, {
			headers: {Authorization: "Bearer " + token},
			params: { "amount": digos }
	    	});
	    	console.log(res.data.response_message);
			return res.data.response_message;
		} catch (e) {
			verif(e.response.data.error.code, e.response.data.error.message);
			return null;
		}
	},
	grantUserRequest: function(token, userId) {
		var url = "http://indigo-dev.myprojekts.fr/admin/user/grant/" + userId;
		console.log(url);
		var token = "Bearer " + token;
		try {
			var res = HTTP.post(url, {
				headers: {Authorization: token}
			});
			console.log(res.data.response_message);
			return res;
		} catch (e) {
			verif(e.response.data.error.code, e.response.data.error.message);
			return null;
		}
	},
	banUserRequest: function(token, userId) {
		var url = "http://indigo-dev.myprojekts.fr/admin/user/" + userId + "/ban";
		console.log(url);
		var token = "Bearer " + token;
		try {
			var res = HTTP.post(url, {
				headers: {Authorization: token}
			});
			console.log(res.data.response_message);
			return res;
		} catch (e) {
			verif(e.response.data.error.code, e.response.data.error.message);
			return null;
		}
	},
	unbanUserRequest: function(token, userId) {
		var url = "http://indigo-dev.myprojekts.fr/admin/user/" + userId + "/unban";
		console.log(url);
		var token = "Bearer " + token;
		try {
			var res = HTTP.post(url, {
				headers: {Authorization: token}
			});
			console.log(res.data.response_message);
			return res;
		} catch (e) {
			verif(e.response.data.error.code, e.response.data.error.message);
			return null;
		}
	},
	transacUserRequest: function(token, userId) {
		var ret = [
    		{
    		  "advert_name": "marteau",
    		  "price": 2,
    		  "id_prop": 1,
    		  "date": "2015-10-16T11:55:27+0300",
    		  "type_advert": 1
    		},
    		{
    		  "advert_name": "fleurs",
    		  "price": 3,
    		  "id_prop": 2,
    		  "date": "2015-10-16T11:55:27+0300",
    		  "type_advert": 3
    		}
  		];
		return ret;

		var url = "http://indigo-dev.myprojekts.fr/admin/user/" + userId + "/wallet";
		console.log(url);
		var token = "Bearer " + token;
		try {
			var res = HTTP.post(url, {
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
