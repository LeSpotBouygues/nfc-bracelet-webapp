Meteor.methods({
    TeamsListRequest: function() {
	var url = "http://ec2-54-86-80-245.compute-1.amazonaws.com:3000/teams";
	try {
	    var res = HTTP.get(url, {});
	    return JSON.parse(res.content);
	} catch (e) {
	    console.log(e);
	    return null;
	}
    },

    TeamsRemoveCompanionRequest: function(idTeam, idCompanion) {
	var url = "http://ec2-54-86-80-245.compute-1.amazonaws.com:3000/teams/" + idTeam + "/removeCompanion";
	try {
	    var res = HTTP.put(url, {
		data: {
		    companion: idCompanion
		}
	    });
	    return JSON.parse(res.content);
	} catch (e) {
	    console.log(e);
	    return null;
	}
    },

    TeamsAddCompanionRequest: function(idTeam, idCompanion) {
	var url = "http://ec2-54-86-80-245.compute-1.amazonaws.com:3000/teams/" + idTeam + "/addCompanion";
	try {
	    var res = HTTP.put(url, {
		data: {
		    companion: idCompanion
		}
	    });
	    return JSON.parse(res.content);
	} catch (e) {
	    console.log(e);
	    return null;
	}
    },

    TeamsDeleteTeamRequest: function(idTeam) {
	var url = "http://ec2-54-86-80-245.compute-1.amazonaws.com:3000/teams/" + idTeam;
	try {
	    var res = HTTP.del(url, {});
	    return JSON.parse(res.content);
	} catch (e) {
	    console.log(e);
	    return null;
	}
    },

    TeamCreateRequest: function(chiefV, teamMembers) {
	var url = "http://ec2-54-86-80-245.compute-1.amazonaws.com:3000/teams";
	try {
	    var res = HTTP.post(url, {
		data: {
		    chief: chiefV,
		    companions: teamMembers
		}
	    });
	    return JSON.parse(res.content);
	} catch (e) {
	    console.log(e);
	    return null;
	}
    },
});
