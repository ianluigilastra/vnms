WhatsnewTopNews = new Meteor.Collection('WhatsnewTopNews');


if (Meteor.isServer) {
    Meteor.publish('WhatsnewTopNews', function (query) {
    	 // tb.info( ">>>>>>> PUBLISH DE SIGN TOOLS COLLECTIONS <<<<<<<<<");
        return WhatsnewTopNews.find(query.selector, query.options);
    });
}
