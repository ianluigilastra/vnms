Template.addFeatureAnnouncements.helpers({
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
        		
        		
        	}
    	}
	}
});

Template.addFeatureAnnouncements.rendered=function() {
    $('.panel-body .input-group.date').datepicker({
    	todayBtn: "linked",
    	autoclose: true
    });

     $('#vnm-form').parsley({trigger:'change'});
}


Template.addFeatureAnnouncements.events({
	'click button#btn-save' : function(e,t){
		if($('#vnm-form').parsley().validate()){	
			e.preventDefault();
			var fileDataInfojpg = TempColjpg.findOne({});
			var featureAnnouncement = {
				"_id": new Mongo.ObjectID(),
				"date": new Date($('#txt-date').val()),
				"title" : $('#txt-title').val(),
				"description" :$('#txt-description').val(),
				"url" : $('#txt-url').val(), 
			};

			if(Session.get('uploadedjpg')){
					featureAnnouncement.imageName = fileDataInfojpg.name;
					featureAnnouncement.imagePath = fileDataInfoJpg.path;
				}




			Meteor.call('insertFeatureAnnouncement',featureAnnouncement, function(error, response){
	            if(error){
	                alert(error.reason);
	              }else{
					TempColjpg.remove({});
					delete Session.keys['uploadedjpg'];
					$('#vnm-form').fadeOut();
					$('#btn-save').hide();
					$('.alert-success').fadeIn();
	              }
	        });
		}
	},
	'click button#btn-back' : function(){
		if(Session.get("uploaded")){
			var fileDataInfojpg = TempColjpg.findOne({});
			Meteor.call('deleteFile',fileDataInfojpg.path);
			delete Session.keys['uploadedjpg'];
			TempColjpg.remove({});
			Router.go('/apps/newsfeed/feature-announcements');
		} else {
			Router.go('/apps/newsfeed/feature-announcements');
			
		}
	}
});

Template.addFeatureAnnouncements.created = function() {
	var self = this;
	setPaginationSession();
	self.autorun(function(){
	    self.subscribe("Categories",{selector:{}},{options:{}});
		self.subscribe("LuBrands",{selector:{}},{options:{}});
    });
}