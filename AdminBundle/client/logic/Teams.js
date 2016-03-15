Template.Teams.onRendered(function () {
    Meteor.call('TeamsListRequest', function(error, res) {	    
    	console.log(res);
    	if (!error && res) {
	    Session.set('teamsCurrentPage', 1);
	    Session.set('teamsPerPage', 10);
	    Session.set('teamsNb', res.length);
	    Session.set('teamMembersShow', null);
	    Session.set('teamTasksShow', null);
    	    Session.set('teams', res);

	    Session.set('membersDisplay', false);
	    Session.set('tasksDisplay', false);
    	}	
    });

    Meteor.call('CompanionsListRequest', function(error, res) {
    	if (!error && res) {
    	    Session.set('companions', res);
    	}
    });

 
    Meteor.call('TasksListRequest', function(error, res) {	    
    	if (!error && res) {
    	    return Session.set('tasks', res);
    	}	
    });   
    

    $("selectACompanion").select2({
	placeholder: "Select a companion"
    });

    $("selectATask").select2({
	placeholder: "Select a task"
    });
    
    // $(".js-example-basic-single").select2({
    // 	tags: true
    // });

    
});


Template.Teams.helpers({
    teams: function(page) {
	var comp =  Session.get('teams');
	var firstElem = Session.get('teamsPerPage') * (Session.get('teamsCurrentPage') - 1);
	var lastElem = (Session.get('teamsPerPage') * (Session.get('teamsCurrentPage') - 1)) +
	    Session.get('teamsPerPage');

	return comp.slice(firstElem, lastElem);
    },
    teamsFull: function(debut = 1, lim = 10) {
	return Session.get('teams');
    },

    companionsFull: function() {
	return Session.get('companions');
    },

    tasksFull: function() {
	return Session.get('tasks');
    },

    tasksDisplay: function() {
	return Session.get('tasksDisplay');
    },

    membersDisplay: function() {
	return Session.get('membersDisplay');
    },
    
    teamMembersShow: function() {
	return Session.get('teamMembersShow');
    },

    teamTasksShow: function() {
	return Session.get('teamTasksShow');
    },
    
    pagination: function() {
	var i = 0;
	var elem = [];
	
	while (i <  (Session.get('teamsNb') / Session.get('teamsPerPage')) + 1) {
	    elem.push(i);
	    i++;
	}
	return elem;
    }
});


Template.Teams.events({

    "click #nextTeams": function() {
	if (Session.get('teamsCurrentPage') <
	    (Session.get('teamsNb') / Session.get('teamsPerPage'))) {
	    Session.set('teamsCurrentPage', Session.get('teamsCurrentPage') + 1);
	}
    },
    
    "click #prevTeams": function() {
	if (Session.get('teamsCurrentPage') > 1) {
	    Session.set('teamsCurrentPage', Session.get('teamsCurrentPage') - 1);
	}
    },


    "change #pageSelected": function() {
	var selectValue = $("#pageSelected").val();
	Session.set('teamsCurrentPage', parseInt(selectValue));
    },
    
    // Teams Events
    
    "click .showteam": function(event) {
	Session.set('idTeam', $(event.target).data("id-team"));
	Session.set('teamMembersShow', $(this)[0].companions);
	Session.set('membersDisplay', true);
	Session.set('tasksDisplay', false);
    },


    "click .deleteTeam": function(event) {
	var index = $(event.target).data("index");
	var idTeam = $(event.target).data("id-team");
	var teams = Session.get('teams');
	
	Meteor.call('TeamsDeleteTeamRequest', idTeam, function(error, res) {	    
     	    if (!error && res) {
		teams.splice(index, 1);
		Session.set('teams', teams);	
		Session.set('teamMembersShow', null);
    	    } else {
		alert("Error : Something happened with the server");
	    }
	});
    },
    
    "click .removeCompanion": function(event) {
	var index = $(event.target).data("index");
	var idCompanion = $(event.target).data("id-companion");
	var members = Session.get('teamMembersShow');


	
	Meteor.call('TeamsRemoveCompanionRequest', Session.get('idTeam'), idCompanion, function(error, res) {	    
     	    if (!error && res) {
		console.log(members);
		members.splice(index, 1);
		console.log(members);
		Session.set('teamMembersShow', members);
    	    } else {
		alert("Error : Something happened with the server");
	    }
	});
    },

    "submit #selectACompanionForm": function(event) {
	event.preventDefault();


	var result = event.target.selectACompanion.value;
	
	var tab = [];
	tab = result.split(",");

	var idCompanion = tab[0];

	var member = {
	    _id: idCompanion,
	    firstName: tab[1],
	    lastName: tab[2]
	}
	
	Meteor.call('TeamsAddCompanionRequest', Session.get('idTeam'), idCompanion, function(error, res) {	    
     	    if (!error && res) {
		var members = Session.get('teamMembersShow');
		members.push(member);
		Session.set('teamMembersShow', members);
    	    } else {
		alert("Error : Something happened with the server");
	    }
	});
    },

    "click .showtasks": function(event) {
	Session.set('idTeam', $(event.target).data("id-team"));
	Session.set('teamTasksShow', $(this)[0].tasks);
	console.log($(this)[0].tasks);
	Session.set('membersDisplay', false);
	Session.set('tasksDisplay', true);
    },


    "submit #selectATaskForm": function(event) {
	event.preventDefault();

	var result = event.target.selectATask.value;
	
	var tab = [];
	tab = result.split(",");

	console.log(tab);
	
	var idTask = tab[0];
	
	var task = {
	    _id: idTask,
	    label_long: tab[1]
	}
	
	Meteor.call('TaskAddRequest', Session.get('idTeam'), idTask, function(error, res) {	    
     	    if (!error && res) {
		var tasks = Session.get('teamTasksShow');
		tasks.push(task);
		Session.set('teamTasksShow', tasks);
    	    } else {
		alert("Error : Something happened with the server");
	    }
	});
    },


    "click .removeTask": function(event) {
	var index = $(event.target).data("index");
	var idTask = $(event.target).data("id-task");
	var tasks = Session.get('teamTasksShow');
	

	Meteor.call('TaskRemoveRequest', Session.get('idTeam'), idTask, function(error, res) {	    
     	    if (!error && res) {
		console.log(tasks);
		tasks.splice(index, 1);
		console.log(tasks);
		Session.set('teamTasksShow', tasks);
    	    } else {
		alert("Error : Something happened with the server");
	    }
	});
    },
});



// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------


Template.CreateTeams.onRendered(function () {
    Meteor.call('CompanionsListRequest', function(error, res) {
    	if (!error && res) {
	    Session.set('companionsCurrentPage', 1);
	    Session.set('companionsPerPage', 10);
	    Session.set('companionsNb', res.length);
	    Session.set('teamMembersShow', null);
    	    Session.set('companions', res);
    	}
    });

    Meteor.call('TasksListRequest', function(error, res) {
    	if (!error && res) {
    	    Session.set('tasks', res);
    	}	
    });
});


Template.CreateTeams.helpers({
    companions: function(page) {
	var comp =  Session.get('companions');
	var firstElem = Session.get('companionsPerPage') * (Session.get('companionsCurrentPage') - 1);
	var lastElem = (Session.get('companionsPerPage') * (Session.get('companionsCurrentPage') - 1)) +
	    Session.get('companionsPerPage');

	return comp.slice(firstElem, lastElem);
    },
    
    companionsFull: function() {
	return Session.get('companions');
    },

    tasksFull: function() {
	return Session.get('tasks');
    },

    teamMembersShow: function() {
	return Session.get('teamMembersShow');
    },
    
    pagination: function() {
	var i = 0;
	var elem = [];
	
	while (i <  (Session.get('companionsNb') / Session.get('companionsPerPage')) + 1) {
	    elem.push(i);
	    i++;
	}
	return elem;
    }
});

Template.CreateTeams.events({
    "click #nextCompanions": function() {
	if (Session.get('companionsCurrentPage') <
	    (Session.get('companionsNb') / Session.get('companionsPerPage'))) {
	    Session.set('companionsCurrentPage', Session.get('companionsCurrentPage') + 1);
	}
    },
    
    "click #prevCompanions": function() {
	if (Session.get('companionsCurrentPage') > 1) {
	    Session.set('companionsCurrentPage', Session.get('companionsCurrentPage') - 1);
	}
    },

    "change #pageSelected": function() {
	var selectValue = $("#pageSelected").val();
	Session.set('companionsCurrentPage', parseInt(selectValue));
    },

    "click .addChief": function(event) {
	var idMember = $(event.target).data("id-member");
	var firstName = $(event.target).data("firstname");
	var lastName = $(event.target).data("lastname");

	var  member = {
	    _id: $(event.target).data("id-member"),
	    firstName: $(event.target).data("firstname"),
	    lastName: $(event.target).data("lastname"),
	    position: 1
	};


	console.log(member);
	
	if (Session.get('teamMembersShow') == null) {
	    Session.set('teamMembersShow', [member]);
	} else {
	    var members = Session.get('teamMembersShow');

	    for (var i = 0; i < members.length; i++) {
		if (members[i].position == 1) {
		    alert("[ERROR] A chief has been specified already");
		    return ;
		}
	    }
	    members.push(member);
	    Session.set('teamMembersShow', members);
	}
    },

    "click .addMember": function(event) {
	var idMember = $(event.target).data("id-member");
	var firstName = $(event.target).data("firstname");
	var lastName = $(event.target).data("lastname");

	var  member = {
	    _id: $(event.target).data("id-member"),
	    firstName: $(event.target).data("firstname"),
	    lastName: $(event.target).data("lastname"),
	    position: 2
	};

	
	if (Session.get('teamMembersShow') == null) {
	    Session.set('teamMembersShow', [member]);
	} else {
	    var members = Session.get('teamMembersShow');

	    for (var i = 0; i < members.length; i++) {
		if (members[i]._id == member._id) {
		    alert("[ERROR] The companion is already in the liste");
		    return ;
		}
	    }
	    members.push(member);
	    Session.set('teamMembersShow', members);
	}
    },

    "click .removeMember": function(event) {

	var idMember = $(event.target).data("id-member");
	var firstName = $(event.target).data("firstname");
	var lastName = $(event.target).data("lastname");
	var index = $(event.target).data("index");
	var members = Session.get('teamMembersShow');

	for (var i = 0; i < members.length; i++) {
	    console.log(i);
	    if (members[i]._id == idMember) {
		members.splice(index, 1);
	    }
	}
	
	Session.set('teamMembersShow', members);
    },

    "click .createTeam": function(event) {
	
	var members = Session.get('teamMembersShow');
	var count = 0;
	var chief = null;
	var teamMembers = [];
	
	if (members == null) {
	    alert("[ERROR] You need to set at least a chief");
	}

	for (var i = 0; i < members.length; i++) {
	    if (members[i].position == 1) {
		chief = members[i];
		count++;	
	    } else {
		teamMembers.push(members[i]);
	    }
	}

	if (count == 0) {
	    alert("[ERROR] You need to set at least a chief");
	}


	Meteor.call('TeamCreateRequest', chief, teamMembers, function(error, res) {
    	    if (!error && res) {
		alert("[SUCESS] The team has been created");
		Session.set('teamMembersShow', null);
    	    }
	});

    },
});
