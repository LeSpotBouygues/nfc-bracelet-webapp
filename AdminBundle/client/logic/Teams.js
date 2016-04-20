Template.Teams.onRendered(function () {
    Meteor.call('TeamsListRequest', function(error, res) {	    
    	if (!error && res) {
	    Session.set('teamsCurrentPage', 1);
	    Session.set('teamsPerPage', 5);
	    Session.set('teamsNb', res.length);
	    Session.set('teamMembersShow', null);
	    Session.set('teamTasksShow', null);
    	    Session.set('teams', res);
	    
	    Session.set('membersDisplay', false);
	    Session.set('tasksDisplay', false);
	    Session.set('tasksMemberDisplay', false);
    	}	
    });
    
    $("#selectACompanion").select2({
    	placeholder: "Select a companion"
    });

    $("#selectATask").select2({
	placeholder: "Select a task"
    });

     $("#selectATaskTeam").select2({
	placeholder: "Select a task"
    });
    
    Meteor.call('CompanionsNoTeamListRequest', function(error, res) {
    	if (!error && res) {
    	    Session.set('companions', res);
    	}
    });

    Meteor.call('TasksListRequest', function(error, res) {	    
    	if (!error && res) {
    	    Session.set('tasks', res);
    	}	
    });   
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

    tasksMemberDisplay: function() {
	return Session.get('tasksMemberDisplay');
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

    memberTasksShow: function() {
	return Session.get('memberTasksShow');
    },

    assignableTask: function() {
	return Session.get('assignableTask');
    },

    teamName: function() {
	return Session.get('teamName');
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
        Session.set('teamName', $(event.target).data("team-name"));
	Session.set('teamMembersShow', $(this)[0].companions);
	Session.set('teamTasksShow', $(this)[0].tasks);
	Session.set('membersDisplay', true);
	Session.set('tasksDisplay', false);
	Session.set('tasksMemberDisplay', false);
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
		Session.set('tasksMemberDisplay', false);
		Session.set('tasksDisplay', false);
		Session.set('membersDisplay', false);
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
		Session.set('tasksMemberDisplay', false);
    	    } else {
		alert("Error : Something happened with the server");
	    }
	});
	Meteor.call('TeamsListRequest', function(error, res) {
    	    if (!error && res) {
    		Session.set('teams', res);
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
	
	Meteor.call('TeamsListRequest', function(error, res) {
    	    if (!error && res) {
    		Session.set('teams', res);
    	    }
	});
    },

    "click .showtasks": function(event) {
	Session.set('idTeam', $(event.target).data("id-team"));
	Session.set('teamName', $(event.target).data("team-name"));
	Session.set('teamTasksShow', $(this)[0].tasks);
	Session.set('membersDisplay', false);
	Session.set('tasksDisplay', true);
	Session.set('tasksMemberDisplay', false);
    },

    "click .showtasksMember": function(event) {
	Session.set('tasksMemberDisplay', true);
	var teamMember = Session.get('teamMembersShow');
	var idCompanion = $(event.target).data("id-companion");

	console.log($(event.target).data("id-companion"));
	Session.set('idCompanion', $(event.target).data("id-companion"));	

	Session.set('memberTasksShow', teamMember[$(event.target).data("index")].tasksInProgress);

    	Meteor.call('TeamsListRequest', function(error, res) {
    	    if (!error && res) {
    		Session.set('teams', res);
		var assignableTask = Session.get('teamTasksShow');
		var memberTask = Session.get('memberTasksShow');

		Session.set('assignableTask', null);
		// for (var j = 0; j < assignableTask.length; j++) {
		//     assignableTask[j]["none"] = "";
		// }
		for (var i = 0; i < memberTask.length; i++)
		{
		    for (var j = 0; j < assignableTask.length; j++)
		    {
			// console.log("j = " + j);
			console.log(memberTask[i]._id + "et" + assignableTask[j]._id);
			if (memberTask[i]._id == assignableTask[j]._id)
			{
    			    // assignableTask[j]["none"] = "checked";
			    assignableTask.splice(j, 1);
			    break ;
			}
		    }
		}
		Session.set('assignableTask', assignableTask);
    	    }
    	});
	
    },

    
    "click .removetaskmember": function(event) {
    	var index = $(event.target).data("index");
    	var idTask = $(event.target).data("id-task");
    		var teamMember = Session.get('teamMembersShow');
    	var memberTasks = Session.get('memberTasksShow');



    	Meteor.call('CompanionRemoveTaskRequest', Session.get('idCompanion'), idTask, function(error, res) {	    
     	    if (!error && res) {
    		console.log(memberTasks);
    		memberTasks.splice(index, 1);
    		console.log(memberTasks);
    		Session.set('memberTasksShow', memberTasks);
    		Session.set('tasksMemberDisplay', true);
    	    } else {
    		alert("Error : Something happened with the server");
    	    }
    	});
    	Meteor.call('TeamsListRequest', function(error, res) {
    	    if (!error && res) {
    		Session.set('teams', res);

		var assignableTask = Session.get('teamTasksShow');
		var memberTask = Session.get('memberTasksShow');
		
		console.log(assignableTask);
		console.log(memberTask);
		
		for (var i = 0; i < memberTask.length; i++)
		{
		    for (var j = 0; j < assignableTask.length; j++)
		    {
			console.log(memberTask[i]._id + "et" + assignableTask[j]._id);
			if (memberTask[i]._id ==  assignableTask[j]._id)
			{
    			    assignableTask.splice(j, 1);
			    break ;
			}
		    }
		}
		Session.set('assignableTask', assignableTask);
    	    }
    	});
    },

    // "click .addTaskMember": function(event){
    // 	var idTask = $(event.target).data("idTask");
    // 	console.log("id companin" + Session.get('idCompanion'));
    // 	console.log("task " + $(event.target).data("id-task"));
    // 	if ($(event.target).is(":checked") == true)
    // 	{
    // 	    Meteor.call('CompanionAddTaskRequest', Session.get('idCompanion'), idTask, function(error, res) {	    
    //  		if (!error && res) {
    // 		    alert("Success : Task added");
    // 		    Meteor.call('TeamsListRequest', function(error, res) {
    // 			if (!error && res) {
    // 			    Session.set('teams', res);
    // 			    var assignableTask = Session.get('teamTasksShow');
    // 			    var memberTask = Session.get('memberTasksShow');
			    
    // 			    console.log(assignableTask);
    // 			    console.log(memberTask);
			    
    // 			    Session.set('assignableTask', null);
    // 		  	    for (var j = 0; j < assignableTask.length; j++) {
    // 				assignableTask[j]["none"] = "";
    // 			    }
    // 			    for (var i = 0; i < memberTask.length; i++)
    // 			    {
    // 				for (var j = 0; j < assignableTask.length; j++)
    // 				{
    // 				    if (memberTask[i]._id == assignableTask[j]._id)
    // 				    {
    // 					assignableTask[j]["none"] = "checked";
    // 					break ;
    // 				    }
    // 				}
    // 			    }
    // 			    Session.set('assignableTask', assignableTask);	
    // 			}
    // 		    });
    // 		} else {
    // 		    alert("Error : Something happened with the server");
    // 		}
    // 	    });
    // 	}
    // 	else
    // 	{
    // 	    Meteor.call('CompanionRemoveTaskRequest', Session.get('idCompanion'), idTask, function(error, res) {	    
    //  		if (!error && res) {
    // 		    alert("Success : Task removed");
    // 		    Session.set('tasksMemberDisplay', true);

    // 		    Meteor.call('TeamsListRequest', function(error, res) {
    // 			if (!error && res) {
    // 			    Session.set('teams', res);
    // 			    var assignableTask = Session.get('teamTasksShow');
    // 			    var memberTask = Session.get('memberTasksShow');

    // 			    console.log(assignableTask);
    // 			    console.log(memberTask);
    // 			    Session.set('assignableTask', null);
    // 			    for (var j = 0; j < assignableTask.length; j++) {
    // 				assignableTask[j]["none"] = "";
    // 			    }
    // 			    for (var i = 0; i < memberTask.length; i++)
    // 			    {
    // 				for (var j = 0; j < assignableTask.length; j++)
    // 				{
    // 				    // console.log("j = " + j);
    // 				    console.log(memberTask[i]._id + "et" + assignableTask[j]._id);
    // 				    if (memberTask[i]._id == assignableTask[j]._id)
    // 				    {
    // 					assignableTask[j]["none"] = "checked";
    // 					break ;
    // 				    }
    // 				}
    // 			    }
    // 			    Session.set('assignableTask', assignableTask);	
    // 			}
    // 		    });
    // 		} else {
    // 		    alert("Error : Something happened with the server");
    // 		}
    // 	    });
    // 	}
    // },
    
    "submit #selectATaskTeamForm": function(event) {
	event.preventDefault();
	var result = event.target.selectATaskTeam.value;
	console.log(result);
	var tab = [];
	tab = result.split(",");

	console.log(tab);
	
	var idTask = tab[0];
	
	var task = {
	    _id: idTask,
	    label_long: tab[1],
	    code: tab[2]
	}
	
	Meteor.call('CompanionAddTaskRequest', Session.get('idCompanion'), idTask, function(error, res) {	    
     	    if (!error && res) {
		var tasks = Session.get('memberTasksShow');
		tasks.push(task);
		Session.set('memberTasksShow', tasks);
    	    } else {
		alert("Error : Something happened with the server");
	    }
	});


	Meteor.call('TeamsListRequest', function(error, res) {
    	    if (!error && res) {
    		Session.set('teams', res);


		var assignableTask = Session.get('teamTasksShow');
		var memberTask = Session.get('memberTasksShow');

		console.log(assignableTask);
		console.log(memberTask);

		for (var i = 0; i < memberTask.length; i++)
		{
		    // console.log("i = " + i);
		    for (var j = 0; j < assignableTask.length; j++)
		    {
			// console.log("j = " + j);
			console.log(memberTask[i]._id + "et" + assignableTask[j]._id);
			if (memberTask[i]._id == assignableTask[j]._id)
			{
    			    assignableTask.splice(j, 1);
			    break ;
			}
		    }
		}
		Session.set('assignableTask', assignableTask);
    	    }
	});
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


	Meteor.call('TeamsListRequest', function(error, res) {
    	    if (!error && res) {
    		Session.set('teams', res);
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

	Meteor.call('TeamsListRequest', function(error, res) {
    	    if (!error && res) {
    		Session.set('teams', res);
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
    Meteor.call('CompanionsNoTeamListRequest', function(error, res) {
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
		Meteor.call('CompanionsNoTeamListRequest', function(error, res) {
    		    if (!error && res) {
    			Session.set('companions', res);
    		    }
		});
    	    }
	});
    },
});
