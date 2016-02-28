Template.addNewsletterCategoryTbl.helpers({
	data : function () {
		return newsletterCategories.find({},{skip:Session.get("pgSkip"), limit:Session.get("pgLimit")}).fetch();
	},
	dataCount : function() {
		return newsletterCategories.find().fetch();
	}
});

Template.addNewsletterCategory.helpers({
	newIdno : function () {
		var res = newsletterCategories.findOne({},{sort: {newsletterCategoryId:-1}}).newsletterCategoryId;
		return res + 1; 
	}
});

Template.addNewsletterCategory.events({
	'click button#btn-add' : function (e,t) {
		e.preventDefault();
		if($('#nl-form').parsley().validate()){
			var newCategoryName = {
				"_id" : new Mongo.ObjectID(),
				"newsletterCategoryId" : parseInt($('#txt-category-id').val()),
				"categoryName" : $('#txt-category-name').val()
			}
			Meteor.call('insertNewsletterCategory',newCategoryName,function(e,r){
				if(e){
					alert(e.error);
				} else {
					$('<div class="alert alert-success alert-message" role="alert" style="margin:20px;"><strong>Save Successful!</strong>added new newsfeed category...</div>').insertAfter(".new-data-panel");
      				setTimeout(function(){ $('.alert-message').fadeOut(); }, 3000)
				}
			});
		}
	},
	'click button#btn-back' : function (e,t) {
		e.preventDefault();
		Router.go('/apps/newsfeed/newsletters');
	}
});
Template.addNewsletterCategory.events({
	'click button#btn-del' : function (e,t) {
		 e.preventDefault();
		 var desc = newsletterCategories.findOne({_id:this._id}).categoryName
    	if (confirm("Are you sure you want to delete " + desc + " ?")) {
      		Meteor.call('deleteNewsletterCategory', this._id,function(e,r){
				if(e){
					alert(e.error);
				} else {
					$('<div class="alert alert-info alert-message" role="alert" style="margin:20px;"><strong>Deleted!</strong>'+ desc +' deleted...</div>').insertAfter(".category-list-panel");
      				setTimeout(function(){ $('.alert-message').fadeOut(); }, 3000)
				} 
			});
    	}
	}
});



Template.addNewsletterCategory.rendered = function () {
	 $('#nl-form').parsley({trigger:'change'})
};


Template.addNewsletterCategory.created = function() {
	var self = this;
	setPaginationSession();
	self.autorun(function(){
		self.subscribe("newsletterCategories",{selector:{}},{options:{}});
    });
}