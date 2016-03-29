Router.onBeforeAction(function(req, res, next) {
    var nfcUrl = "/admin/nfc";
    var url = req.url;

    if (url.indexOf(nfcUrl) > -1)
    {
    	this.next();
	return ;
    }
    
    if (!Session.get('userToken')) {
    	BlazeLayout.render('Login');
    } else {
    	this.next();
    }
});

Router.route('/admin', function () {
    BlazeLayout.render('AdminPanel');
});

Router.route('/', function () {
    BlazeLayout.render('AdminPanel');
});

Router.route('/admin/teams', function () {
    BlazeLayout.render('AdminPanel', {main: 'Teams'});
});

Router.route('/admin/team/create', function () {
    BlazeLayout.render('AdminPanel', {main: 'CreateTeams'});
});

Router.route('/admin/tasks', function () {
    BlazeLayout.render('AdminPanel');
});

Router.route('/admin/companions', function () {
    BlazeLayout.render('AdminPanel', {main: 'Companions'});
});

Router.route('/admin/companion/create', function () {
    Meteor.call('RemoveNfcId');
    BlazeLayout.render('AdminPanel', {main: 'CreateCompanions'});
});

Router.route('/admin/companion/:id/update', function () {
    Meteor.call('RemoveNfcId');
    Meteor.call('GetCompanionById', this.params.id.toString(), function(error, res) {	    
    	console.log(error);
    	if (!error && res) {
	    Session.set('companionId', res._id);
	    Session.set('companionFirstName', res.firstName);
	    Session.set('companionLastName', res.lastName);
	    Session.set('companionAliasName', res.aliasName);
	    Session.set('companionNationality', res.nationality);
 	    Session.set('companionCompany', res.company);
	    Session.set('companionPosition', res.position);
	    Session.set('companionWorkPermit', res.workPermit);
	    Session.set('companionExpirationDate', res.expirationDate);
	    Session.set('companionVacationStart', res.vacationStart);
	    Session.set('companionVacationEnd', res.vacationEnd);
    	}
    });
    
    BlazeLayout.render('AdminPanel', {main: 'UpdateCompanion'});
});

Router.route( "/admin/nfc/:id", function () {
    var id    = this.params.id;

    Meteor.call('RemoveNfcId');
    
    Meteor.call('AddNfcId', id, function(error, res) {
	return true;
    });

    this.response.statusCode = 200;
    this.response.end("id read");
}, { where: "server" });

Router.route('/admin/import', function () {
    BlazeLayout.render('AdminPanel', {main: 'Import'});
});

Router.route('/admin/export', function () {
        BlazeLayout.render('AdminPanel', {main: 'Export'});
});
