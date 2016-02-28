
/* required to have this "routeAfterSave" session to know where it will fall next*/

Template.dataSavedRecords.rendered = function () {
		setTimeout(function(){Router.go(Session.get("routeAfterSave"));
	},5000);
}