Meteor.methods({
    searchRequest: function(token, begin, count, query) {
	var url = "http://indigo-dev.myprojekts.fr/api/search/" + begin + "/" + count
	    + "?type=" + query.type
	    + "&family=" + query.family
	    + "&query=" + query.keywords;
	var token = "Bearer " + token;
	try {
	    var res = HTTP.get(url, {
		headers: {Authorization: token}
	    });
	    console.log(url);
	    //			console.log(res.data.result);
	    return res;
	} catch (e) {
	    console.log(e);
	    console.log(e.response);
	    verif(e.response.data.error.code, e.response.data.error.message);
	    return null;
	}
    }
});
