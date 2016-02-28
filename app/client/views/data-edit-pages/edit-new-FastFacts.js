Template.editNewFastFacts.helpers({
	data : function() {
		var ID = new Mongo.ObjectID(this.id);	
		return FastFact.find({_id:ID}).fetch()
	},
	formatDate : function (date) {
		var mm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		var d = new Date(date);
		return mm[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	},
	semiconductors: function() {
		var sup = [];
		Categories.find({parentId:1,sortOrderId:{$exists:true}},{sort:[["sortOrderId","asc"]]}).forEach(function(categs){
			sup.push({categName:categs.categoryName,num:categs.id, key: categs.categoryName });
		});
		return sup;
	},
	subSemiconductors: function(id) {
		var sup = [];
		Categories.find({parentId:1,id:id}).forEach(function(parentHasBlurb){	
			if(parentHasBlurb.blurb!=null) {
				if(!(parentHasBlurb.id==20))
					sup.push({categName:parentHasBlurb.categoryName,num:parentHasBlurb.id,key:parentHasBlurb.categoryName });
			}
		});
		Categories.find({parentId:id,sortOrderId:{$exists:true}},{sort:[["sortOrderId","asc"]]}).forEach(function(categs){
			if(id==4) sup.push({categName:"Diodes" ,num:6, key: 'cat6'});
			sup.push({categName:categs.categoryName,num:categs.id, key: categs.categoryName});
		});
		return sup;
	},
	passiveComponents: function() {
		var sup = [];
		Categories.find({parentId:2,sortOrderId:{$exists:true}},{sort:[["sortOrderId","asc"]]}).forEach(function(categs){
			sup.push({categName:categs.categoryName,num:categs.id, key: categs.categoryName });
		});
		return sup;
	},
	subPassiveComponents: function(id) {
		var sup = [];
		Categories.find({parentId:id,sortOrderId:{$exists:true}},{sort:[["sortOrderId","asc"]]}).forEach(function(categs){
			sup.push({categName:categs.categoryName,num:categs.id, key:categs.categoryName });
		});
		return sup;
	},
	brands: function () {
		return LuBrands.find().fetch();
	},
	catName : function(id) {
		console.log(id)
		return getCategoryName(id);
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

Template.editNewFastFacts.rendered=function() {
    $('.panel-body .input-group.date').datepicker({
    	todayBtn: "linked",
    	autoclose: true
    });

    $('#vnm-form').parsley({trigger:'change'});
}


Template.editNewFastFacts.events({
	'mouseenter #txt-date' : function (e,t) {
		$('.panel-body .input-group.date').datepicker({
    	todayBtn: "linked",
    	autoclose: true
  		});
	},
	'click button#btn-npi-save' : function(e,t){
		if($('#vnm-form').parsley().validate()){
			var ID = new Mongo.ObjectID(this.id);	
			e.preventDefault();
			var fileDataInfo = TempCol.findOne({});
			var fileDataInfoJpg = TempColjpg.findOne({});
			var fastFact = {
				"rev": new Date($('#txt-date').val()),
				"description" :$('#txt-description').val(),
	    		"type" : "Fast Fact",
	    		"categoryId" : $('#sel-prod-group').val(),
			};
				if(Session.get('uploaded')){
					fastFact.fileName =  fileDataInfo.name;
					fastFact.filePath = fileDataInfo.path;
				}
				if(Session.get('uploadedjpg')){
					fastFact.imageName = fileDataInfoJpg.name;
					fastFact.imagePath = fileDataInfoJpg.path;
				}


			Meteor.call('updateFastFact',ID,fastFact, function(error, response){
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
	'click button#btn-npi-back' : function(e,t){
		if(Session.get("uploaded") || Session.get("uploadedjpg")){
			var fileDataInfo = TempCol.findOne({});
			var fileDataInfojpg = TempColjpg.findOne({});
			Meteor.call('deleteFile',fileDataInfo.path);
			Meteor.call('deleteFile',fileDataInfojpg.path);
			if(Session.get("uploaded")){delete Session.keys['uploaded']};
			if(Session.get("uploadedjpg")){delete Session.keys['uploadedjpg']};
			TempCol.remove({});
			TempColjpg.remove({});
			Router.go('/apps/newsfeed/fast-facts');
		} else {
			Router.go('/apps/newsfeed/fast-facts');
			
		}
		
	}
});

Template.editNewFastFacts.created = function() {
	var self = this;
	self.autorun(function(){
		self.subscribe("Categories",{selector:{}},{options:{}});
		self.subscribe("FastFact",{selector:{}},{options:{}});
		self.subscribe("LuBrands",{selector:{}},{options:{}});
    });
}