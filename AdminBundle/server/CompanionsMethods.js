Meteor.methods({
    CompanionsListRequest: function() {
	var url = urlApi + "/companions";
	try {
	    var res = HTTP.get(url, {});
	    return JSON.parse(res.content);
	} catch (e) {
	    return null;
	}
    },

    CompanionsNoTeamListRequest: function() {
	var url = urlApi + "/companions/noTeam";
	try {
	    var res = HTTP.get(url, {});
	    return JSON.parse(res.content);
	} catch (e) {
	    return null;
	}
    },
    
    CreateCompanionRequest: function(vIdBracelet, vIdPayrol, vIdBycn, vFirstName,
				     vLastName, vNationality, vCompany, vPosition, vWorkPermit,
				     vExpirationDate, vVacationStart, vVacationEnd) {
	var url = urlApi + "/companions";
	try {
	    var res = HTTP.post(url, {
		data: {
		    idBracelet: vIdBracelet,
		    idPayrol: vIdPayrol,
		    idBycn: vIdBycn,
		    firstName: vFirstName,
		    lastName: vLastName,
		    nationality: vNationality,
		    company: vCompany,
		    position: vPosition,
		    workPermit: vWorkPermit,
		    expirationDate: vExpirationDate,
		    vacationStart: vVacationStart,
		    vacationEnd : vVacationEnd
		}
	    });
	    return JSON.parse(res.content);
	} catch (e) {
	    return null;
	}
    },

    GetCompanionById: function(companionId) {
	var url = urlApi + "/companions/" + companionId;
	try {
	    var res = HTTP.get(url, {});
	    return JSON.parse(res.content);
	} catch (e) {
	    return null;
	}
    },

    UpdateCompanionRequest: function(vIdBracelet, vFirstName, vLastName, vAliasName, vNationality,
				     vCompany, vPosition, vWorkPermit, vExpirationDate,
				     vVacationStart, vVacationEnd, id) {
	var url = urlApi + "/companions/" + id;
	try {
	    var res = HTTP.put(url, {
		data: {
		    idBracelet: vIdBracelet,
		    firstName: vFirstName,
		    lastName: vLastName,
		    aliasName: vAliasName,
		    nationality: vNationality,
		    company: vCompany,
		    position: vPosition,
		    workPermit: vWorkPermit,
		    expirationDate: vExpirationDate,
		    vacationStart: vVacationStart,
		    vacationEnd: vVacationEnd
		}
	    });
	    return JSON.parse(res.content);
	} catch (e) {
	    return null;
	}
    },

    CompanionRemoveTaskRequest: function(idCompanion, idTask) {
	var url = urlApi + "/companions/" + idCompanion + "/removeTask";
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

    CompanionAddTaskRequest: function(idCompanion, idTask) {
	var url = urlApi + "/companions/" + idCompanion + "/addTask";
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
    
    
    AddNfcId: function(nfcIdV) {
    	Nfc.insert({
    	    nfcId: nfcIdV
    	});
	return true;
    },

    GetNfcId: function() {
    	return Nfc.find({});
    },

    RemoveNfcId: function() {
    	return Nfc.remove({});
    },
});
