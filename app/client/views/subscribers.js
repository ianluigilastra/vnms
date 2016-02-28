Template.newsfeedSubscriberTbl.helpers({
	data : function() {
		return WhatsnewSubscriber.find({},{skip:Session.get("pgSkip"),limit:Session.get("pgLimit")}).fetch();
	},
	formatDate : function (date) {
		var mm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		var d = new Date(date);
		return mm[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	},
	dataCount : function() {
		return WhatsnewSubscriber.find().fetch();
	}
});


Template.newsfeedSubscriber.events({
	'click button#new-npi' : function(){
		Router.go('/apps/newsfeed/feature-announcements/add-feature-announcements');
	},
	'click #delete-NPI-item' : function(e,t) {
		e.preventDefault();
    	if (confirm("Are you sure you want to delete " + this.description + " ?")) {
      		Meteor.call('deleteNewProductInfo', this._id);
    	}
	},
	'click .dataview-table-items-row' : function(e,t){
		Router.go('/apps/newsfeed/feature-announcements/view/' + this._id);
	}

});

Template.newsfeedSubscriber.rendered=function() {
    $('#new-npi').tooltip();
    $('#delete-npi').tooltip();
}

  
Template.newsfeedSubscriber.created = function() {
	var self = this;
	setPaginationSession();
	self.autorun( function(){
      self.subscribe("WhatsnewSubscriber", {selector:{},options:{sort:{_id:-1}}});
    });
}