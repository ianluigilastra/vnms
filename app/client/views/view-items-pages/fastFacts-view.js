Template.viewFastFacts.helpers({
	fastFactsData : function () {
		var ID = new Mongo.ObjectID(this.id);
		var res = FastFact.findOne({_id:ID},{});
		if(res){
			this.description = res.description
			this.imagePath = res.imagePath;
			this.filePath = res.filePath;
		};

		return res 
	},
	isTopNews : function () {
		return isThisTopNews(this.id);
	}
});

Template.viewFastFacts.events({
	'click button#btn-back' : function(){
		Router.go('/apps/newsfeed/fast-facts');
	},
	'click button#btn-edit' : function(){
		Router.go('/apps/newsfeed/fast-facts/edit-new-fastFacts/' + this.id);
	},

	'click button#btn-delete' : function(e,t) {
		e.preventDefault();
		var ID = new Mongo.ObjectID(this.id)	
    	if(confirm("Are you sure you want to delete \"" + this.description + "\" ?")) {
    		console.log(this.id);
    		Meteor.call('deleteFile', this.filePath);
			Meteor.call('deleteFile', this.imagePath);
      		Meteor.call('deleteFastFacts', ID, function(error,response){
      			if(error){
      				alert(error.error);
      			}else{
  					$('<div class="alert alert-info fade in" role="alert" style="margin:20px;"><strong>Note!</strong>  Fast Fact Deleted...</div>').insertAfter("#info-view");
      				$('#btn-top-news').hide();
      				setTimeout(function(){ Router.go('/apps/newsfeed/fast-facts') }, 2000)
      			}
      		});

    	}
	},
	'click button#btn-top-news' : function(e,t) {
		var ID = new Mongo.ObjectID(this.id);	
		var data = FastFact.findOne({_id:ID},{});
		console.log(data);
		var topNews = {
			_id : new Mongo.ObjectID(),
			id_ : data._id,
			rev : new Date(),
			date : data.rev,
			productGroup : getCategoryGroupName(data.categoryId),
			title : data.description,
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

  
Template.viewFastFacts.created = function() {
	var self = this;
	var ID = new Mongo.ObjectID(this.data.id);
	 self.autorun( function(){
      self.subscribe("FastFact",{selector:{_id:ID}},{options:{}});
      self.subscribe("Categories",{selector:{}},{options:{}});
      self.subscribe("WhatsnewTopNews",{selector:{}},{options:{}});
    });
}