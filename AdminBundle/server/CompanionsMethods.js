Meteor.methods({
    CompanionsListRequest: function() {
	var url = urlApi + "/companions";
	try {
	    var res = HTTP.get(url, {});
	    return JSON.parse(res.content);
	} catch (e) {
	    console.log(e);
	    return null;
	}
    },

    CompanionsNoTeamListRequest: function() {
	var url = urlApi + "/companions/noTeam";
	try {
	    var res = HTTP.get(url, {});
	    return JSON.parse(res.content);
	} catch (e) {
	    console.log(e);
	    return null;
	}
    },
    
    CreateCompanionRequest: function(vIdPayrol, vIdBycn, vFirstName,
				     vLastName, vNationality, vCompany, vPosition, vWorkPermit,
				     vExpirationDate, vVacationStart, vVacationEnd) {
	var url = urlApi + "/companions";
	try {
	    var res = HTTP.post(url, {
		data: {
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
	    console.log(e);
	    return null;
	}
    },

    GetCompanionById: function(companionId) {
	var url = urlApi + "/companions/" + companionId;
	try {
	    var res = HTTP.get(url, {});
	    return JSON.parse(res.content);
	} catch (e) {
	    console.log(e);
	    return null;
	}
    },

    UpdateCompanionRequest: function(vFirstName, vLastName, vAliasName, vNationality,
				     vCompany, vPosition, vWorkPermit, vExpirationDate,
				     vVacationStart, vVacationEnd, id) {
	var url = urlApi + "/companions/" + id;
	console.log(vAliasName);
	try {
	    var res = HTTP.put(url, {
		data: {
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
	    console.log(e);
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
