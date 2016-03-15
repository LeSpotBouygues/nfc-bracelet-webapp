Meteor.methods({
    CompanionsListRequest: function() {
	var url = "http://ec2-54-86-80-245.compute-1.amazonaws.com:3000/companions";
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
	var url = "http://ec2-54-86-80-245.compute-1.amazonaws.com:3000/companions";
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
	var url = "http://ec2-54-86-80-245.compute-1.amazonaws.com:3000/companions/" + companionId;
	try {
	    var res = HTTP.get(url, {});
	    return JSON.parse(res.content);
	} catch (e) {
	    console.log(e);
	    return null;
	}
    },

    UpdateCompanionRequest: function(vFirstName, vLastName, vNationality,
				     vCompany, vPosition, vWorkPermit, vExpirationDate,
				     vVacationStart, vVacationEnd, id) {
	var url = "http://ec2-54-86-80-245.compute-1.amazonaws.com:3000/companions/" + id;
	try {
	    var res = HTTP.put(url, {
		data: {
		    firstName: vFirstName,
		    lastName: vLastName,
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
});
