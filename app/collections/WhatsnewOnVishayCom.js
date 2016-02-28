whatsNewOnVishay = new Meteor.Collection('WhatsnewOnVishayCom');


if (Meteor.isServer) {
    Meteor.publish('whatsNewOnVishay', function (query) {
    	 // tb.info( ">>>>>>> PUBLISH DESIGN TOOLS COLLECTIONS <<<<<<<<<");
        return whatsNewOnVishay.find(query.selector,query.options);
    });
}
