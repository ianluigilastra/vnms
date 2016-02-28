Categories = new Meteor.Collection('Categories');


if (Meteor.isServer) {
    Meteor.publish('Categories', function (query) {
    	 // tb.info( ">>>>>>> PUBLISH DE SIGN TOOLS COLLECTIONS <<<<<<<<<");
        return Categories.find(query.selector, query.options);
    });
}
