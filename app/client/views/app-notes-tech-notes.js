Template.appNoteTechNotes.helpers({
	appNotesTechNotesData : function() {
		return Whatsnew.find({},{skip:Session.get("pgSkip"),limit:Session.get("pgLimit"),sort:{date:-1}}).fetch();	
	},
	formatDate : function (date) {
		var mm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		var d = new Date(date);
		return mm[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	},
	dataCount : function() {
		return Whatsnew.find().fetch();	
	},
});

Template.appNoteTechNotes.events({
	'click button#new-ANTN' : function(){
		Router.go('/apps/newsfeed/app-note-tech-notes/add-app-notes-tech-notes');
	},
	'click #delete-ANTN-item' : function(e,t) {
		e.preventDefault();
    	if (confirm("Are you sure you want to delete " + this.description + " ?")) {
      		Meteor.call('deleteAppNotesTechNotes', this._id);
    	}
	}

});

Template.appNoteTechNotes.created = function() {
	var self = this;
	setPaginationSession();
	 self.autorun( function(){
      self.subscribe("Whatsnew",{selector: {$or:[{documentType:"Application Notes"},{documentType:"Technical Notes"}]},options:{}});
    });
}