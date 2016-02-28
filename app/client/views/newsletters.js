Template.newsletters.helpers({
	newsletterCategories : function () {
		console.log(filterCategory.get())
		return newsletterCategories.find(filterCategory.get()).fetch();
	},
	luNewsletterCategories : function () {
		return newsletterCategories.find().fetch();
	},
	Data : function() {
		return Newsletter.find({},{skip:Session.get("pgSkip"),limit:Session.get("pgLimit")});	
	},
});

Template.newslettersTbl.helpers({
	newsletterData : function(data) {
		return Newsletter.find({} ,{skip:Session.get("pgSkip"),limit:Session.get("pgLimit")}).fetch();	
	},
	dataCount : function(data) {
		return Newsletter.find({}).fetch();
	},

	newsletterCategories : function () {
		return newsletterCategories.find().fetch();
	},
	formatDate : function (date) {
		var mm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		var d = new Date(date);
		return mm[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	},
	formatDate2 : function (date) {
		var mm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		var d = new Date(date);
		return d;
	}
	
});

Template.newslettersTbl.created = function () {
	console.log(this);
};

Template.newsletters.events({
	'click button#new-newsLetter' : function(){
		Router.go("/apps/newsfeed/newsletters/add-new-newsletter");
	},
	'click #delete-NL-item' : function(e,t) {
		e.preventDefault();
    	if (confirm("Are you sure you want to delete " + this.description + " ?")) {
      		Meteor.call('deleteNewsletter', this._id);
    	}
	},
	'change #sel-NL-category' : function (e,t) {
		if($(e.target).val() == "All"){
			filterCategory.set({});
		}else{
		filterCategory.set({newsletterCategoryId: Number($('#sel-NL-category').val())});
		}
	},
	'dblclick .dataview-table-items-row' : function(e,t){
		Router.go('/apps/newsfeed/newsletters/view/' + this._id);
	},
	'click button#new-nl-category' : function(){
		Router.go("/apps/newsfeed/newsletters/add-newsletter-category");
	},

});

Template.newsletters.created = function() {
	var self = this;
	filterCategory = new ReactiveVar({});
	setPaginationSession();
	 self.autorun( function(){
      self.subscribe("Newsletter",{selector:filterCategory.get(),options:{sort:{_id:-1}}});
      self.subscribe("newsletterCategories",{selector:{},options:{}});
    });
}