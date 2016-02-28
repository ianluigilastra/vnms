LuBrands = new Meteor.Collection('LuBrands');


if (Meteor.isServer) {
    Meteor.publish('LuBrands', function (query) {
    	 // tb.info( ">>>>>>> PUBLISH DE SIGN TOOLS COLLECTIONS <<<<<<<<<");
        return LuBrands.find(query.selector, query.options);
    });
}
