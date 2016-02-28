Template.viewWhatsNew.helpers({
	whatsNewData : function () {
		var ID = new Mongo.ObjectID(this.id);
		var res = whatsNewOnVishay.findOne({_id:ID});
		if(res){
			this.description = res.description;
			this.filePath = res.filePath;
		};
		return res
	},
	retCatGroup : function (id) {
		return getCategoryGroupName(id);
	},
	isTopNews : function () {
		return isThisTopNews(this.id);
	}
});

Template.viewWhatsNew.events({
	'click button#btn-back' : function(){
		Router.go('/apps/newsfeed/whats-new-on-vishay');
	},
	'click button#btn-edit' : function(){
		Router.go('/apps/newsfeed/whats-new-on-vishay/edit-whats-new/' + this.id);
	},

	'click button#btn-delete' : function(e,t) {
		e.preventDefault();
		console.log(t)
		console.log(this);
		var ID = new Mongo.ObjectID(this.id)	
    	if(confirm("Are you sure you want to delete " + "\"" + this.description + "\"" + " ?")) {
    		Meteor.call('deleteFile', this.filePath);
      		Meteor.call('deleteWhatsNew', ID, function(error,response){
      			if(error){
      				alert(error.error);
      			}else{
  					$('<div class="alert alert-info fade in" role="alert" style="margin:20px;"><strong>Delete Successful!</strong>Whats New on Vishay.com item Deleted...</div>').insertAfter("#info-view");
      				$('#btn-top-news').hide();
      				setTimeout(function(){ Router.go('/apps/newsfeed/whats-new-on-vishay') }, 2000)
      			}
      		});

    	}
	},
	'click button#btn-top-news' : function(e,t) {
		var ID = new Mongo.ObjectID(this.id);	
		var data = whatsNewOnVishay.findOne({_id:ID},{});
		console.log(data);
		var topNews = {
			_id : new Mongo.ObjectID(),
			id_ : data._id,
			rev : new Date(),
			date : data.rev,
			productGroup : getCategoryGroupName(data.categoryId),
			title : data.description,
			imagePath: data.imagePath,
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

  
Template.viewWhatsNew.created = function() {
	var self = this;
	var ID = new Mongo.ObjectID(this.data.id);
	 self.autorun( function(){
    	self.subscribe("whatsNewOnVishay",{selector:{_id:ID}},{options:{}});
		self.subscribe("Categories",{selector:{}},{options:{}});
		self.subscribe("WhatsnewTopNews",{selector:{}},{options:{}});
    });
}