featureAnnouncements = new Meteor.Collection('WhatsnewFeatureAnnouncement');


if (Meteor.isServer) {
    Meteor.publish('WhatsnewFeatureAnnouncement', function (query) {
    	 // tb.info( ">>>>>>> PUBLISH DE SIGN TOOLS COLLECTIONS <<<<<<<<<");
        return featureAnnouncements.find(query.selector, query.options);
    });
}
