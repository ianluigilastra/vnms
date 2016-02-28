newsletterCategories = new Meteor.Collection('WhatsnewNewsletterCategories');


if (Meteor.isServer) {
    Meteor.publish('newsletterCategories', function (query) {
    	 // tb.info( ">>>>>>> PUBLISH DE SIGN TOOLS COLLECTIONS <<<<<<<<<");
        return newsletterCategories.find(query.selector, query.options);
    });
}
