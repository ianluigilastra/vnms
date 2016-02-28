FastFact = new Meteor.Collection('WhatsnewFastFact');


if (Meteor.isServer) {
    Meteor.publish('FastFact', function (query) {
    	 // tb.info( ">>>>>>> PUBLISH DESIGN TOOLS COLLECTIONS <<<<<<<<<");
        return FastFact.find(query.selector,query.options);
    });
}
