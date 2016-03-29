Meteor.methods({
    TasksListRequest: function() {
	var url = urlApi + "/tasks";
	try {
	    var res = HTTP.get(url, {});
	    return JSON.parse(res.content);
	} catch (e) {
	    return null;
	}
    },

    TasksAffectableListRequest: function() {
	var url = urlApi + "/tasks/open";
	try {
	    var res = HTTP.get(url, {});
	    return JSON.parse(res.content);
	} catch (e) {
	    return null;
	}
    },

    TaskAddRequest: function(idTeam, idTask) {
	var url = urlApi + "/teams/" + idTeam + "/addTask";
	try {
	    var res = HTTP.put(url, {
		data: {
		    task: idTask
		}
	    });
	    return JSON.parse(res.content);
	} catch (e) {
	    return null;
	}
    },

    TaskRemoveRequest: function(idTeam, idTask) {
	var url = urlApi + "/teams/" + idTeam + "/removeTask";
	try {
	    var res = HTTP.put(url, {
		data: {
		    task: idTask
		}
	    });
	    return JSON.parse(res.content);
	} catch (e) {
	    return null;
	}
    },
});
