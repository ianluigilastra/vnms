Template.literatureLibrary.helpers({
	literatureLibraryData : function() {
		return docs.find({},{skip:Session.get("pgSkip"),limit:Session.get("pgLimit")}).fetch();	
	},
	formatDate : function (date) {
		var mm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		var d = new Date(date);
		return mm[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	},
	dataCount : function() {
		return docs.find().fetch();
	}
});

Template.literatureLibrary.created = function() {
	var self = this;
	setPaginationSession();
	 self.autorun( function(){
      self.subscribe("documentData",{selector: {type : 'PROMAT'},options:{sort:{rev:-1}}});
    });
},{}