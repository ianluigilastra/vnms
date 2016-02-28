NewProductInfo = new Meteor.Collection('WhatsnewNewProduct');


if (Meteor.isServer) {
    Meteor.publish('NewProductInfo', function (query) {
    	console.info("NewProductInfo ",query);
        return NewProductInfo.find(query.selector,query.options);
    });
}
