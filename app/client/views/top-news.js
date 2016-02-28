Template.topNews.helpers({
	formatDate : function (date) {
		var mm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		var d = new Date(date);
		return mm[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	},
	topNewsData : function () {
    	return WhatsnewTopNews.findOne({current:1});
	}
});

Template.topNewsTbl.helpers({
	allTopNews : function() {
		return WhatsnewTopNews.find({},{skip:Session.get("pgSkip"),limit:Session.get("pgLimit")}).fetch();
	},
	formatDate : function (date) {
		var mm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		var d = new Date(date);
		return mm[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	},
	dataCount : function() {
		return WhatsnewTopNews.find().fetch();
	},
	retCatGroup : function (id) {
		return getCategoryGroupName(id);
	},
	returnId : function () {
		return selectedId.get();
	},
	editTopNews : function (id) {
		return WhatsnewTopNews.find({_id:id},{}).fetch();
	}
});

Template.topNews.created = function() {
	var self = this;
	self.autorun(function(){
		self.subscribe("WhatsnewTopNews",{selector:{},options:{sort:{rev:-1}}});
		self.subscribe("Categories",{selector:{},options:{}});
    });
}

Template.topNewsTbl.created = function () {
		setPaginationSession();	
	selectedId = new ReactiveVar();
	      $('#btn-edit-date').tooltip();
}

Template.topNewsTbl.rendered = function () {
	   $('.panel-body .input-group.date').datepicker({
    	todayBtn: "linked",
    	autoclose: true
    });
}

Template.topNewsTbl.events({
	'click #btn-del' : function(e,t) {
		e.preventDefault();
		console.log(this._id);
		var desc = WhatsnewTopNews.findOne({_id:this._id}).title
    	if (confirm("Are you sure you want to delete \"" + desc + "\" ?")) {
      		Meteor.call('deleteTopNews', this._id, function(err,resp){
      			if(err){
      				alert(err.error);
      			}else{
      				$('<div class="alert alert-info alert-top-news" role="alert" style="margin:20px;"><strong>Delete Successful!</strong>Whats New on Vishay.com item Deleted...</div>').insertAfter(".alert-here");
      				setTimeout(function(){ $('.alert-top-news').fadeOut(); }, 2000)
      			}
      		});
    	}
	},
	'click #btn-edit-date' : function (e,t) {
		e.preventDefault();
		selectedId.set(this._id);
	},
	'click #btn-save-edit' : function (e,t) {
		e.preventDefault();
		newDate = $('#txt-date').val();
		Meteor.call('updateTopNewsDate',selectedId.get(),newDate, function(error, response){
	            if(error){
	                alert(error.reason);
	              }else{
					$('<div class="alert alert-info alert-top-news" role="alert" style="margin:20px;"><strong>Date Updated!</strong> Top News Date was updated successfully...</div>').insertAfter(".alert-here");
      				setTimeout(function(){ $('.alert-top-news').fadeOut(); }, 2000)
	              }
	        });

	},
	'click #btn-set-top' : function (e,t) {
		e.preventDefault();
		Meteor.call('setTopNews',this._id, function(error, response){
	            if(error){
	                alert(error.reason);
	              }else{
					$('<div class="alert alert-info alert-top-news" role="alert" style="margin:20px;"><strong>New Top News</strong>Successfully assigned a new Top News..</div>').insertAfter(".alert-here");
      				setTimeout(function(){ $('.alert-top-news').fadeOut(); }, 2000)
	              }
	        });

	},
	'mouseenter #txt-date' : function (e,t) {
		$('.panel-body .input-group.date').datepicker({
    	todayBtn: "linked",
    	autoclose: true
  		});
	},
});