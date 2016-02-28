Template.editNewProductInfo.helpers({
	data : function() {
		var ID = new Mongo.ObjectID(this.id);	
		return NewProductInfo.find({_id:ID}).fetch();
	},
	catName : function(id) {
		console.log(id)
		return getCategoryName(id);
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

Template.editNewProductInfo.rendered=function() {
    $('.panel-body .input-group.date').datepicker({
    	todayBtn: "linked",
    	autoclose: true
    });

    $('#npi-form').parsley({trigger:'change'});
}


Template.editNewProductInfo.events({
	'mouseenter #txt-date' : function (e,t) {
		$('.panel-body .input-group.date').datepicker({
    	todayBtn: "linked",
    	autoclose: true
  		});
	},
	'click button#btn-npi-save' : function(e,t){
		if($('#npi-form').parsley().validate()){
				var ID = new Mongo.ObjectID(this.id);
				e.preventDefault();
				var fileDataInfo = TempCol.findOne({});
				var fileDataInfojpg = TempColjpg.findOne({});
				var newProdInfo = {
					"rev": new Date($('#txt-date').val()),
					"description" :$('#txt-description').val(),
		    		"type" : "New Product",
		    		"buyNow" : $('#txt-buynow').val(),
		    		"categoryId" : parseInt($('#sel-prod-group').val()),
		    		"brand": $('#sel-brand').val()
				};

				/*if uploading involved */
				if(Session.get('uploaded')){
					newProdInfo.fileName =  fileDataInfo.name;
					newProdInfo.filePath = fileDataInfo.path;
				}
				if(Session.get('uploadedjpg')){
					newProdInfo.imageName = fileDataInfojpg.name;
					newProdInfo.imagePath = fileDataInfojpg.path;
				}

				Meteor.call('updateProductInfo',ID, newProdInfo, function(error, response){
		            if(error){
		                alert(error.reason);
		              }else{
		              	TempCol.remove({});
						TempColjpg.remove({});
						delete Session.keys['uploaded'];
						delete Session.keys['uploadedjpg'];
						$('#npi-form').fadeOut();
						$('#btn-npi-save').hide();
						$('.alert-success').fadeIn();
		              }
        		});
    	}
	},
	'click button#btn-npi-back' : function(){
		if(Session.get("uploaded") || Session.get("uploadedjpg")){
			var fileDataInfo = TempCol.findOne({});
			var fileDataInfojpg = TempColjpg.findOne({});
			Meteor.call('deleteFile',fileDataInfo.path);
			Meteor.call('deleteFile',fileDataInfojpg.path);
			if(Session.get("uploaded")){delete Session.keys['uploaded']};
			if(Session.get("uploadedjpg")){delete Session.keys['uploadedjpg']};
			TempCol.remove({});
			TempColjpg.remove({});
			Router.go('/apps/newsfeed/new-product-info');
		} else {
			Router.go('/apps/newsfeed/new-product-info');
			
		}
	}
});

Template.editNewProductInfo.created = function() {
	var self = this;
	delete Session.keys['uploaded'];
	delete Session.keys['uploadedjpg'];
	self.autorun(function(){
	    self.subscribe("Categories",{selector:{}},{options:{}});
		self.subscribe("LuBrands",{selector:{}},{options:{}});
		self.subscribe("NewProductInfo",{selector:{}},{options:{}});
    });
}