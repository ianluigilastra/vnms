Template.viewNewsletter.helpers({
	newsletterdata : function () {
		var ID = new Mongo.ObjectID(this.id);
		var res = Newsletter.findOne({_id:ID});
		if(res){
			this.description = res.title
			this.imagePath = res.imagePath;
			this.filePath = res.filePath;
		}
		return res
	},
	category : function(catId) {
		return getNewsletterCategoryName(catId)
	},
	isTopNews : function () {
		console.log(isThisTopNews(this.id))
		return isThisTopNews(this.id);
	}
});

Template.viewNewsletter.events({
	'click button#btn-back' : function(){
		Router.go('/apps/newsfeed/newsletters');
	},
	'click button#btn-edit' : function(){
		Router.go('/apps/newsfeed/newsletters/edit-new-newsletter/' + this.id);
	},

	'click button#btn-delete' : function(e,t) {
		e.preventDefault();
		var ID = new Mongo.ObjectID(this.id)	
    	if(confirm("Are you sure you want to delete \"" + this.description + "\" ?")) {
    		console.log(this.id);
			Meteor.call('deleteFile', this.filePath);
			Meteor.call('deleteFile', this.imagePath);
      		Meteor.call('deleteNewsletter', ID, function(error,response){
      			if(error){
      				alert(error.error);
      			}else{
  					$('<div class="alert alert-info fade in" role="alert" style="margin:20px;"><strong>Note!</strong>  Newsletter Deleted...</div>').insertAfter("#info-view");
      				$('#btn-top-news').hide();
      				setTimeout(function(){ Router.go('/apps/newsfeed/fast-facts') }, 2000)
      			}
      		});
      		

    	}
	},
	'click button#btn-top-news' : function(e,t) {
		var ID = new Mongo.ObjectID(this.id);	
		var data = Newsletter.findOne({_id:ID},{});
		console.log(data);
		var topNews = {
			_id : new Mongo.ObjectID(),
			id_ : data._id,
			rev : new Date(),
			date : data.date,
			productGroup : getNewsletterCategoryName(data.newsletterCategoryId),
			title : data.title,
			imagePath: data.imagePath,
			imageName: data.imageName,
			fileName: data.fileName,
			current : 1
		};
		
		Meteor.call("insertTopNews",topNews,function(error,result){
			if(error){
				alert(error.error);
			}
		});
	}
});

  
Template.viewNewsletter.created = function() {
	var self = this;
	console.log(this.data.id)
	var ID = new Mongo.ObjectID(this.data.id);
	 self.autorun( function(){
    	self.subscribe("Newsletter",{selector:{_id:ID}},{options:{}});
     	self.subscribe("newsletterCategories",{selector:{}},{options:{}});
     	self.subscribe("WhatsnewTopNews",{selector:{}},{options:{}});
    });
}