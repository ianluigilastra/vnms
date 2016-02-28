Template.home.created = function () {
	document.title="Newsfeed Maintenance";
	this.subscribe("Categories",{selector:{}},{options:{}});
	this.subscribe("LuBrands",{selector:{}},{options:{}});
}

Template.home.events({
	'click a#start' : function (e,t) {
		e.preventDefault();
		console.log("this is working")
        $("#wrapper").toggleClass("toggled");
	} 
});