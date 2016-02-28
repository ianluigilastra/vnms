Template.viewProductInfo.helpers({
	productInfo : function () {
		var ID = new Mongo.ObjectID(this.id);
		var res = NewProductInfo.findOne({_id:ID});
		if(res){
			this.description = res.description
			this.imagePath = res.imagePath;
			this.filePath = res.filePath;
		};
		return res;
	},
	isTopNews : function () {
		console.log(isThisTopNews(this.id))
		return isThisTopNews(this.id);
	}
});

Template.viewProductInfo.events({
	'click button#btn-back' : function(){
		Router.go('/apps/newsfeed/new-product-info');
	},
	'click button#btn-edit' : function(){
		Router.go('/apps/newsfeed/new-product-info/edit-new-product-info/' + this.id);
	},
	'click button#btn-delete' : function(e,t) {
		e.preventDefault();
		var ID = new Mongo.ObjectID(this.id)	
    	if(confirm("Are you sure you want to delete \"" + this.description + "\" ?")) {
    		console.log(this.id);
    		Meteor.call('deleteFile', this.filePath);
			Meteor.call('deleteFile', this.imagePath);
      		Meteor.call('deleteNewProductInfo', ID,function(error,response){
      			if(error){
      				alert(error.error);
      			}else{
      				$('<div class="alert alert-info fade in" role="alert" style="margin:20px;"><strong>Note!</strong>New Product Info Deleted...</div>').insertAfter("#info-view");
      				$('#btn-top-news').hide();
      				setTimeout(function(){ Router.go('/apps/newsfeed/new-product-info') }, 2000)
      			}
      		});
      		

    	}
	},
	'click button#btn-top-news' : function(e,t) {
		var ID = new Mongo.ObjectID(this.id);	
		var NPI = NewProductInfo.findOne({_id:ID},{});
		var topNews = {
			_id : new Mongo.ObjectID(),
			id_ : NPI._id,
			rev : new Date(),
			date : NPI.rev,
			productGroup : getCategoryGroupName(NPI.categoryId),
			title : NPI.description,
			imagePath: NPI.imagePath,
			imageName: NPI.imageName, 
			fileName: NPI.fileName,
			current : 1
		};
		console.log(topNews);
		Meteor.call("insertTopNews",topNews,function(error,result){
			if(error){
				alert(error.error);
			}
		});
	}
});

  
Template.viewProductInfo.created = function() {
	var self = this;
	var ID = new Mongo.ObjectID(this.data.id);
	self.autorun( function(){
    	self.subscribe("NewProductInfo",{selector:{_id:ID}},{options:{}});
    	self.subscribe("Categories",{selector:{}},{options:{}});
    	self.subscribe("WhatsnewTopNews",{selector:{}},{options:{}});
    });
}