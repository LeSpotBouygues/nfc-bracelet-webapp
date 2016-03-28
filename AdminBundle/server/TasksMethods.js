Meteor.methods({
    TasksListRequest: function() {
	var url = "http://ec2-54-86-80-245.compute-1.amazonaws.com:3000/tasks";
	try {
	    var res = HTTP.get(url, {});
	    return JSON.parse(res.content);
	} catch (e) {
	    console.log(e);
	    return null;
	}
    },

    TasksAffectableListRequest: function() {
	var url = "http://ec2-54-86-80-245.compute-1.amazonaws.com:3000/tasks/open";
	try {
	    var res = HTTP.get(url, {});
	    return JSON.parse(res.content);
	} catch (e) {
	    console.log(e);
	    return null;
	}
    },

    TaskAddRequest: function(idTeam, idTask) {
	var url = "http://ec2-54-86-80-245.compute-1.amazonaws.com:3000/teams/" + idTeam + "/addTask";
	try {
	    var res = HTTP.put(url, {
		data: {
		    task: idTask
		}
	    });
	    return JSON.parse(res.content);
	} catch (e) {
	    console.log(e);
	    return null;
	}
    },

    TaskRemoveRequest: function(idTeam, idTask) {
	var url = "http://ec2-54-86-80-245.compute-1.amazonaws.com:3000/teams/" + idTeam + "/removeTask";
	try {
	    var res = HTTP.put(url, {
		data: {
		    task: idTask
		}
	    });
	    return JSON.parse(res.content);
	} catch (e) {
	    console.log(e);
	    return null;
	}
    },
});
