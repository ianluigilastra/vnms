docs = new Meteor.Collection('Docs');


if (Meteor.isServer) {
    Meteor.publish('documentData', function (query) {
    	 // tb.info( ">>>>>>> PUBLISH DE SIGN TOOLS COLLECTIONS <<<<<<<<<");
        return docs.find(query.selector, query.options);
    });
}
