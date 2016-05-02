

Template.Companions.onRendered(function () {
    Meteor.call('CompanionsListRequest', function(error, res) {
    	if (!error && res) {
	    Session.set('companionsCurrentPage', 1);
	    Session.set('companionsPerPage', 10);
	    Session.set('companionsNb', res.length);
    	    Session.set('companions', res);
    	}	
    });

    $("#selectCompanionForUpdate").select2({
	placeholder: "Select a member"
    });
});

Template.CreateCompanions.onRendered(function () {
    $('#expirationDate').datepicker();
    $('#vacationStart').datepicker();
    $('#vacationEnd').datepicker();
    Meteor.call('RemoveNfcId');
});

Template.UpdateCompanion.onRendered(function () {
    $('#expirationDate').datepicker();
    $('#vacationStart').datepicker();
    $('#vacationEnd').datepicker();
    Meteor.call('RemoveNfcId');
});

Template.UpdateCompanion.helpers({
    companion: function() {
	return {
	    idBracelet: Session.get("companionIdBracelet"),
	    idPayrol: Session.get("companionIdPayrol"),
	    idBycn: Session.get("companionIdBycn"),	    
	    id: Session.get("companionId"),
	    firstName: Session.get("companionFirstName"),
	    lastName: Session.get("companionLastName"),
	    aliasName: Session.get("companionAliasName"),
	    nationality: Session.get("companionNationality"),
	    company: Session.get("companionCompany"),
	    position: Session.get("companionPosition"),
	    workPermit: Session.get("companionWorkPermit"),
	    expirationDate: Session.get("companionExpirationDate"),
	    vacationStart: Session.get("companionVacationStart"),
	    vacationEnd: Session.get("companionVacationEnd"),

	};
    },
    isIdBracelet: function() {
	if (Session.get("companionIdBracelet"))
	    return true;
	else
	    return false;
    }
});

Template.Companions.helpers({
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

Template.registerHelper('formatDate', function(date = null) {
    if (date == null)
	return null;
    else
	return moment(date).format('MM-DD-YYYY');
});

Template.Companions.events({
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

    'submit #findCompanionForUpdate': function(event) {
	event.preventDefault();
	window.location.replace("/admin/companion/" + event.target.selectCompanionForUpdate.value + "/update");
    }
});

Template.CreateCompanions.helpers({
    nfcId: function () {
	var ids = Nfc.find().fetch();	
	return ids[0].nfcId;
    },
});

Template.UpdateCompanion.helpers({
    nfcId: function () {
	var ids = Nfc.find().fetch();	
	return ids[0].nfcId;
    },
});

Template.CreateCompanions.events({
    'submit #createCompanion': function(event) {
	event.preventDefault();
	if (event.target.idPayrol.value == '' ||
	    event.target.idBracelet.value == '' ||
	    event.target.idBYCN.value == '' ||
	    event.target.firstName.value == '' ||
	    event.target.lastName.value == '' ||
	    event.target.nationality.value == '' ||
	    event.target.company.value == '' ||
	    event.target.position.value == '' ||
	    event.target.workPermit.value == '' ||
	    event.target.expirationDate.value == '' ||
	    event.target.vacationStart.value == '' ||
	    event.target.vacationEnd.value == '') {
	    alert("Error: Empty field(s)");
	    return null;
	}

	console.log(event.target.firstName.value);
	console.log(event.target.lastName.value);
	console.log(event.target.nationality.value);
	console.log(event.target.company.value);
	console.log(event.target.position.value);
	Meteor.call('CreateCompanionRequest', event.target.idBracelet.value,
		    event.target.idPayrol.value, event.target.idBYCN.value,
		    event.target.firstName.value, event.target.lastName.value,
		    event.target.nationality.value, event.target.company.value,
		    event.target.position.value, event.target.workPermit.value,
		    event.target.expirationDate.value, event.target.vacationStart.value,
		    event.target.vacationEnd.value,
		    function(error, res) {
			if (!error && res) {
			    event.target.idBracelet.value = '';
			    event.target.idPayrol.value = '';
			    event.target.idBYCN.value = '';
			    event.target.firstName.value = '';
			    event.target.lastName.value = '';
			    event.target.nationality.value = '';
			    event.target.company.value = '';
			    event.target.position.value = '';
			    event.target.workPermit.value = '';
			    event.target.expirationDate.value = '';
			    event.target.vacationStart.value = '';
			    event.target.vacationEnd.value = '';


			    Meteor.call('CompanionsListRequest', function(error, res) {	    
    				console.log(res);
    				if (!error && res) {
				    Session.set('prevCompanions', 1);
				    Session.set('nextCompanions', 10);
    				    Session.set('companions', res);
    				} 
			    });
	    		    alert("Success: User created");
			    window.location.replace("/admin/companions");
			} else {
	    		    alert("Error: The creation of the user has failed");
			    return null;
			}
		    });
    }
});


Template.UpdateCompanion.events({
    'submit #updateCompanion': function(event) {
	event.preventDefault();

	if (event.target.firstName.value == '' ||
	    event.target.idBracelet.value == '' ||
	    event.target.lastName.value == '' ||
	    event.target.aliasName.value == '' ||
	    event.target.nationality.value == '' ||
	    event.target.company.value == '' ||
	    event.target.position.value == '' ||
	    event.target.workPermit.value == '' ||
	    event.target.expirationDate.value == '' ||
	    event.target.vacationStart.value == '' ||
	    event.target.vacationEnd.value == '') {
	    alert("Error: Empty field(s)");
	    return null;
	}	


	Meteor.call('UpdateCompanionRequest', event.target.idBracelet.value,
		    event.target.firstName.value, event.target.lastName.value,
		    event.target.aliasName.value,
		    event.target.nationality.value, event.target.company.value,
		    event.target.position.value, event.target.workPermit.value,
		    event.target.expirationDate.value, event.target.vacationStart.value,
		    event.target.vacationEnd.value, Session.get("companionId"),
		    function(error, res) {
			if (!error && res) {


			    Meteor.call('CompanionsListRequest', function(error, res) {	    
    				console.log(res);
    				if (!error && res) {

				    Session.set('companionsCurrentPage', 1);
				    Session.set('companionsPerPage', 12);
				    Session.set('companionsNb', res.length);
    				    Session.set('companions', res);
    				} 
			    });
			    
	    		    alert("Success: User updated");
			    window.location.replace("/admin/companions");
			} else {
	    		    alert("Error: The update of the user has failed");
			    return null;
			}
		    });
    }
});
