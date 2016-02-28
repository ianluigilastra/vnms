Template.whatsNewOnVishayCom.helpers({
	whatsNewData : function() {
		return whatsNewOnVishay.find({},{skip:Session.get("pgSkip"),limit:Session.get("pgLimit"),sort:{rev:-1}}).fetch();
	},
	formatDate : function (date) {
		var mm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		var d = new Date(date);
		return mm[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	},
	dataCount : function() {
		return whatsNewOnVishay.find().fetch();
	},
	retCatGroup : function (id) {
		return getCategoryGroupName(id);
	}
});


Template.whatsNewOnVishayCom.events({
	'click button#new-whatsnew' : function(){
		Router.go('/apps/newsfeed/whats-new-on-vishay/add-whats-new');
	},
	'click #delete-NPI-item' : function(e,t) {
		e.preventDefault();
    	if (confirm("Are you sure you want to delete " + this.description + " ?")) {
      		Meteor.call('deleteNewProductInfo', this._id);
    	}
	},
	'dblclick .dataview-table-items-row' : function(e,t){
		Router.go('/apps/newsfeed/whats-new-on-vishay/view/' + this._id);
	}

});

Template.whatsNewOnVishayCom.rendered=function() {
    $('#new-npi').tooltip();
    $('#delete-npi').tooltip();
}

  
Template.whatsNewOnVishayCom.created = function() {
	var self = this;
	setPaginationSession();
	self.autorun( function(){
    	self.subscribe("whatsNewOnVishay",{selector:{},options:{}});
		self.subscribe("Categories",{selector:{},options:{}});
    });
}