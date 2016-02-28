WhatsnewSubscriber = new Meteor.Collection('WhatsnewSubscriber');


if (Meteor.isServer) {
    Meteor.publish('WhatsnewSubscriber', function (query) {
    	 // tb.info( ">>>>>>> PUBLISH DE SIGN TOOLS COLLECTIONS <<<<<<<<<");
        return WhatsnewSubscriber.find(query.selector, query.options);
    });
}
