Template.newProductinfoTbl.helpers({
	NPIdata : function() {
		return NewProductInfo.find({},{skip:Session.get("pgSkip"),limit:Session.get("pgLimit")}).fetch();
	},
	formatDate : function (date) {
		var mm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		var d = new Date(date);
		return mm[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	},
	dataCount : function() {
		return NewProductInfo.find().fetch();
	},
	retCatGroup : function (id) {
		return getCategoryGroupName(id);
	}
});


Template.newProductinfo.events({
	'click button#new-npi' : function(){
		Router.go('/apps/newsfeed/new-product-info/add-new-product-info');
	},
	'click #delete-NPI-item' : function(e,t) {
		e.preventDefault();
    	if (confirm("Are you sure you want to delete " + this.description + " ?")) {
      		Meteor.call('deleteNewProductInfo', this._id);
    	}
	},
	'dblclick .dataview-table-items-row' : function(e,t){
		Router.go('/apps/newsfeed/new-product-info/view/' + this._id);
	}

});

Template.newProductinfo.rendered=function() {
    $('#new-npi').tooltip();
    $('#delete-npi').tooltip();
}

  
Template.newProductinfo.created = function() {
	var self = this;
	setPaginationSession();
	self.autorun( function(){
      self.subscribe("NewProductInfo", {selector:{},options:{sort:{rev:-1}}});
      self.subscribe("Categories",{selector:{},options:{}});
    });
}