Whatsnew = new Meteor.Collection('Whatsnew');


if (Meteor.isServer) {
    Meteor.publish('Whatsnew', function (query) {
    	 // tb.info( ">>>>>>> PUBLISH DE SIGN TOOLS COLLECTIONS <<<<<<<<<");
        return Whatsnew.find(query.selector, query.options);
    });
}
