Template.viewFeatureAnnouncements.helpers({
	data : function () {
		var ID = new Mongo.ObjectID(this.id);
		var res = featureAnnouncements.findOne({_id:ID});
		if(res){
			this.description = res.title;
			this.imagePath = res.imagePath;
		};
		return res;
	},
	isTopNews : function () {
		console.log(isThisTopNews(this.id))
		return isThisTopNews(this.id);
	}
});

Template.viewFeatureAnnouncements.events({
	'click button#btn-back' : function(){
		Router.go('/apps/newsfeed/feature-announcements');
	},
	'click button#btn-edit' : function(){
		Router.go('/apps/newsfeed/feature-announcements/edit-feature-announcements/' + this.id);
	},

	'click button#btn-delete' : function(e,t) {
		e.preventDefault();
		var ID = new Mongo.ObjectID(this.id)	
    	if(confirm("Are you sure you want to delete \"" + this.description + "\" ?")) {
    		console.log(this.id);
    		Meteor.call('deleteFile',this.imagePath);
      		Meteor.call('deleteFeatureAnnouncement', ID, function(error,response){
      			if(error){
      				alert(error.error);
      			}else{
  					$('<div class="alert alert-info fade in" role="alert" style="margin:20px;"><strong>Note!</strong>Feature Announcement Deleted...</div>').insertAfter("#info-view");
      				$('#btn-top-news').hide();
      				setTimeout(function(){ Router.go('/apps/newsfeed/feature-announcements') }, 2000)
      			}
      		});
      		

    	}
	}
});

  
Template.viewFeatureAnnouncements.created = function() {
	var self = this;
	var ID = new Mongo.ObjectID(this.data.id);
	self.autorun( function(){
		self.subscribe("WhatsnewFeatureAnnouncement", {selector:{},options:{sort:{_id:-1}}});
    	self.subscribe("Categories",{selector:{}},{options:{}});
    	self.subscribe("WhatsnewTopNews",{selector:{}},{options:{}});
    });
}