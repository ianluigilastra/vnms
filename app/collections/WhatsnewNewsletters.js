Newsletter = new Meteor.Collection('WhatsnewNewsletter');


if (Meteor.isServer) {
    Meteor.publish('Newsletter', function (query) {
    	 // tb.info( ">>>>>>> PUBLISH DESIGN TOOLS COLLECTIONS <<<<<<<<<");
        return Newsletter.find(query.selector,query.options);
    });
}
