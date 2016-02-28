Template.editNewNewsletter.helpers({
	data : function() {
		var ID = new Mongo.ObjectID(this.id);	
		return Newsletter.find({_id:ID}).fetch();
	},
	newsletterCategories : function () {
		return newsletterCategories.find().fetch();
	},
	category : function(catId) {
		return getNewsletterCategoryName(catId)
	},
	myCallbacks: function() {
    	return {
        	finished: function(index, fileInfo, context) { 
        		var oldFileInfo = TempCol.findOne({});
        		if (oldFileInfo) {
	        		console.log(oldFileInfo);
					Meteor.call('deleteFile', oldFileInfo.path, function(err, res){
						if (err) {
						} else {
							TempCol.remove({});
							TempCol.insert(fileInfo);
							Session.set("uploaded", true);
						}
					});	
				} else {
					TempCol.insert(fileInfo);
					Session.set("uploaded", true);
				}
        		
        		
        	},
    	}
	},
	myCallbacksjpg: function() {
    	return {
        	finished: function(index, fileInfo, context) { 
        		var oldFileInfo = TempColjpg.findOne({});
        		if (oldFileInfo) {
	        		console.log(oldFileInfo);
					Meteor.call('deleteFile', oldFileInfo.path, function(err, res){
						if (err) {
						} else {
							TempColjpg.remove({});
							TempColjpg.insert(fileInfo);
							Session.set("uploadedjpg", true);
						}
					});	
				} else {
					TempColjpg.insert(fileInfo);
					Session.set("uploadedjpg", true);
				}
        		
        		
        	},
    	}
	}
});

Template.editNewNewsletter.rendered=function() {
    $('.panel-body .input-group.date').datepicker({
    	todayBtn: "linked",
    	autoclose: true
    });
     
     $('#vnm-form').parsley({trigger:'change'});
}


Template.editNewNewsletter.events({
	'mouseenter #txt-date' : function (e,t) {
		$('.panel-body .input-group.date').datepicker({
    	todayBtn: "linked",
    	autoclose: true
  		});
	},
	'click button#btn-save' : function(e,t){
	if($('#vnm-form').parsley().validate()){
			var ID = new Mongo.ObjectID(this.id);	
			e.preventDefault();
			console.log("save");
			var fileDataInfo = TempCol.findOne({});
			var fileDataInfoJpg = TempColjpg.findOne({});
			var newsletter = {
				"date": new Date($('#txt-date').val()),
				"title" :$('#txt-title').val(),
	    		"url" : $('#txt-url').val(),
	    		"newsletterCategoryId" : parseInt($('#sel-NL-category').val())
			};

				if(Session.get('uploaded')){
						newsletter.docName =  fileDataInfo.name;
						newsletter.filePath = fileDataInfo.path;
					}
					if(Session.get('uploadedjpg')){
						newsletter.imageName = fileDataInfoJpg.name;
						newsletter.imagePath = fileDataInfoJpg.path;
					}


			Meteor.call('updateNewsletter',ID, newsletter, function(error, response){
	            if(error){
	                alert(error.reason);
	              }else{
	              	TempCol.remove({});
					TempColjpg.remove({});
					delete Session.keys['uploaded'];
					delete Session.keys['uploadedjpg'];
					$('#vnm-form').fadeOut();
					$('#btn-save').hide();
					$('.alert-success').fadeIn();
	              }
	        });
		}
	},

	'click button#btn-back' : function(e,t){
		if(Session.get("uploaded") || Session.get("uploadedjpg")){
			var fileDataInfo = TempCol.findOne({});
			var fileDataInfojpg = TempColjpg.findOne({});
			Meteor.call('deleteFile',fileDataInfo.path);
			Meteor.call('deleteFile',fileDataInfojpg.path);
			if(Session.get("uploaded")){delete Session.keys['uploaded']};
			if(Session.get("uploadedjpg")){delete Session.keys['uploadedjpg']};
			TempCol.remove({});
			TempColjpg.remove({});
			Router.go('/apps/newsfeed/newsletters');
		} else {
			Router.go('/apps/newsfeed/newsletters');
			
		}
	}
});

Template.editNewNewsletter.created = function() {
	var self = this;
	var ID = new Mongo.ObjectID(this.data.id);	
	setPaginationSession();
	self.autorun(function(){
	    self.subscribe("Categories",{selector:{}},{options:{}});
	    self.subscribe("Newsletter",{selector:{_id:ID}},{options:{}});
		self.subscribe("newsletterCategories",{selector:{}},{options:{}});
    });
}