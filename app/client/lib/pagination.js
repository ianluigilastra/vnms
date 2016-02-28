Template.pagination.helpers({
	numberOfRec : function(data) {
		return data.length;	 
	},
	numberOfpages : function(data){
		var noPages,
			count= data.length,
			limit= Session.get("pgLimit");
		if((count % limit) > 0){
					noPages = parseInt(count/limit);
					noPages++;
				}else{
					noPages = parseInt(count/limit);
				}
		Session.set("pgTotalPage",noPages);
		return noPages;
	},
	pageNumber: function () {
		return Session.get("pgPage");
	}
});


Template.pagination.events({
	'click a#nextPage' : function(e,t){
		if((Session.get("pgPage") + 1 ) <= Session.get("pgTotalPage")){
		$('a#prevPage').css('color','rgb(51, 122, 183)');
		e.preventDefault();
        var data = t.data;
 		var currentSkip = Session.get("pgSkip");
		var currentLimit = Session.get("pgLimit");
		Session.set("pgPage",Session.get("pgPage"));
		Session.set("pgSkip",Session.get("pgPage") * Session.get("pgLimit"));
		Session.set("pgPage",Session.get("pgPage") + 1 );
		}else{
			$('a#nextPage').css('color','gray')
		}
	},
	'click a#prevPage' : function(e,t){
		if(Session.get("pgPage") != 1){
		$('a#nextPage').css('color','rgb(51, 122, 183)')
		e.preventDefault();
        var data = t.data;
 		var currentSkip = Session.get("pgSkip");
		var currentLimit = Session.get("pgLimit");
		Session.set("pgPage",Session.get("pgPage") - 1 );
		Session.set("pgPage",Session.get("pgPage"));
		Session.set("pgSkip",(Session.get("pgPage") - 1) * Session.get("pgLimit"));
		}else{
			$('a#prevPage').css('color','gray');
		
		}
	}
}); 

returnNewSkip = function (currentSkip, currentPage) {
	return currentSkip * currentPage;
};

setPaginationSession = function (){
	Session.set("pgLimit", 10);
	Session.set("pgSkip",0);
	Session.set("pgPage",1);
}