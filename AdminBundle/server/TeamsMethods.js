Meteor.methods({
    TeamsListRequest: function() {
	var url = urlApi + "/teams";
	try {
	    var res = HTTP.get(url, {});
	    return JSON.parse(res.content);
	} catch (e) {
	    return null;
	}
    },

    TeamsRemoveCompanionRequest: function(idTeam, idCompanion) {
	var url = urlApi + "/teams/" + idTeam + "/removeCompanion";
	try {
	    var res = HTTP.put(url, {
		data: {
		    companion: idCompanion
		}
	    });
	    return JSON.parse(res.content);
	} catch (e) {
	    return null;
	}
    },

    TeamsAddCompanionRequest: function(idTeam, idCompanion) {
	var url = urlApi + "/teams/" + idTeam + "/addCompanion";
	try {
	    var res = HTTP.put(url, {
		data: {
		    companion: idCompanion
		}
	    });
	    return JSON.parse(res.content);
	} catch (e) {
	    
	    return null;
	}
    },

    TeamsDeleteTeamRequest: function(idTeam) {
	var url = urlApi + "/teams/" + idTeam;
	try {
	    var res = HTTP.del(url, {});
	    return JSON.parse(res.content);
	} catch (e) {
	    return null;
	}
    },

    TeamCreateRequest: function(chiefV, teamMembers) {
	var url = urlApi + "/teams";
	try {
	    var res = HTTP.post(url, {
		data: {
		    chief: chiefV,
		    companions: teamMembers
		}
	    });
	    return JSON.parse(res.content);
	} catch (e) {
	    return null;
	}
    },
});
