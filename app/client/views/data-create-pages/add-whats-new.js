Template.addWhatsNew.helpers({
	NPIdata : function() {
		return NewProductInfo.find({},{skip:Session.get("pgSkip"),limit:Session.get("pgLimit")}).fetch();
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
        		
        		
        	}
    	}
	}
});

Template.addWhatsNew.rendered=function() {
    $('.panel-body .input-group.date').datepicker({
    	todayBtn: "linked",
    	autoclose: true
    });

    $('#vnm-form').parsley({trigger:'change'});
}


Template.addWhatsNew.events({
	'click button#btn-save' : function(e,t){
		if($('#vnm-form').parsley().validate()){
			var fileDataInfo = TempCol.findOne({});
			var whatsNew = {
				"_id": new Mongo.ObjectID(),
				"rev": new Date($('#txt-date').val()),
				"categoryId": parseInt($('#sel-prod-group').val()), 
				"description": $('#txt-title').val()
			};

			if(Session.get('uploaded')){
				whatsNew.pdfFileName =  fileDataInfo.name;
				whatsNew.pdfFilePath = fileDataInfo.path;
			}

			Meteor.call('insertWhatsNew',whatsNew, function(error, response){
	            if(error){
	                alert(error.reason);
	            }else{
                	delete Session.keys['uploaded'];
					$('#vnm-form').fadeOut();
					$('#btn-save').hide();
					$('.alert-success').fadeIn();
              	}
	        });
		}	
	},
	'click button#btn-back' : function(){
		if(Session.get("uploaded")){
			var fileDataInfo = TempCol.findOne({});
			console.log(fileDataInfo);
			Meteor.call('deleteFile',fileDataInfo.path);
			delete Session.keys['uploaded'];
			TempCol.remove({});
			Router.go('/apps/newsfeed/whats-new-on-vishay');
		} else {
			Router.go('/apps/newsfeed/whats-new-on-vishay');
			
		}
	}
});

Template.addWhatsNew.created = function() {
	var self = this;
	setPaginationSession();
	self.autorun(function(){
		self.subscribe("whatsNewOnVishay",{selector:{},options:{}});
		self.subscribe("Categories",{selector:{},options:{}});
    });
}