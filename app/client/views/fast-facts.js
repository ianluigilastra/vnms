Template.fastFacts.helpers({
	fastFactsData : function() {
		return FastFact.find({},{skip:Session.get("pgSkip"),limit:Session.get("pgLimit")}).fetch();	
	},
	formatDate : function (date) {
		var mm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		var d = new Date(date);
		return mm[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	},
	dataCount : function() {
		return FastFact.find().fetch();	
	},
	retCatGroup : function (id) {
		return getCategoryGroupName(id);
	}
});

Template.fastFactsTbl.helpers({
	fastFactsData : function() {
		return FastFact.find({},{skip:Session.get("pgSkip"),limit:Session.get("pgLimit")}).fetch();	
	},
	formatDate : function (date) {
		var mm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		var d = new Date(date);
		return mm[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	},
	dataCount : function() {
		return FastFact.find().fetch();	
	},
	retCatGroup : function (id) {
		return getCategoryGroupName(id);
	}
});



Template.fastFacts.events({
	'click button#new-fastFacts' : function(){
		Router.go('/apps/newsfeed/fast-facts/add-new-fastFacts');
	},
	'click #delete-fastFacts-item' : function(e,t) {
		e.preventDefault();
    	if (confirm("Are you sure you want to delete " + t.description + " ?")) {
      		Meteor.call('deleteFastFacts', this._id);
    	}
	},
	'dblclick .dataview-table-items-row' : function(e,t){
		Router.go('/apps/newsfeed/fast-facts/view/' + this._id);
	}

});

Template.fastFacts.created = function() {
	var self = this;
	setPaginationSession();
	 self.autorun( function(){
      self.subscribe("FastFact",{selector:{},options:{sort:{rev:-1}}});
      self.subscribe("Categories",{selector:{},options:{}});
    });
}