Meteor.methods({
    /*Delete*/
	deleteNewProductInfo: function(id) {
		console.log('Item Deleted >>> ' + id);
        NewProductInfo.remove({"_id":id});
    },

    deleteNewsletter: function(id) {
		console.log('Item Deleted >>> ' + id);
        Newsletter.remove({"_id":id});
    },
    deleteAppNotesTechNotes: function(id) {
		console.log('Item Deleted >>> ' + id);
        Whatsnew.remove({"_id":id});
    },
    deleteFastFacts : function(id) {
		console.log('Item Deleted >>> ' + id);
        FastFact.remove({"_id":id});
    },
    deleteWhatsNew : function(id) {
		console.log('Item Deleted >>> ' + id);
        whatsNewOnVishay.remove({"_id":id});
    },
    deleteFeatureAnnouncement: function(id){
        featureAnnouncements.remove({"_id":id});
    },
    deleteTopNews: function(id){
        WhatsnewTopNews.remove({"_id":id});
    },
    deleteNewsletterCategory: function(id){
        newsletterCategories.remove({"_id":id});
    },

    /*INSERT data*/
    insertWhatsNew : function (whatsNew) { 
		whatsNewOnVishay.insert(whatsNew);
	},
    insertTopNews : function (topNews){
    	WhatsnewTopNews.update({current:1},{$set:{current:0}});
    	WhatsnewTopNews.insert(topNews);
    },
    insertProductInfo : function (newProdInfo){
        console.log(newProdInfo);
    	NewProductInfo.insert(newProdInfo);
    },
    insertFastFact: function(fastFact){
      console.log(fastFact);
    	FastFact.insert(fastFact);
	},
	 insertNewsletter: function(newsletter){
        console.log(newsletter);
    	Newsletter.insert(newsletter);
	},
	insertFeatureAnnouncement: function(featureAnnouncement){
        console.log(featureAnnouncement);
		featureAnnouncements.insert(featureAnnouncement);
	},
     insertNewsletterCategory: function(newsletterCategory){
        console.log(newsletterCategory);
        newsletterCategories.insert(newsletterCategory);
    },

    /*UPDATE TABLE*/
	updateProductInfo : function (id,newProdInfo){
        console.log(newProdInfo);
        NewProductInfo.update({_id:id},{$set:newProdInfo});
    },
    updateFastFact: function(id,fastFact){
        console.log(fastFact);
        FastFact.update({_id:id},{$set:fastFact});
    },
    updateNewsletter: function(id,newsletter){
        console.log(newsletter);
        Newsletter.update({_id:id},{$set:newsletter});
    },
    updateFeatureAnnouncement: function(id,featureAnnouncement){
        console.log(featureAnnouncement);
        featureAnnouncements.update({_id:id},{$set:featureAnnouncement});
    },
    updateWhatsNew : function (id, whatsNew) { 
        console.log(whatsNew);
        whatsNewOnVishay.update({_id:id},{$set:whatsNew});
    },
    updateNewsletterCategory : function (id, newsletterCategory) { 
        console.log(newsletterCategory);
        newsletterCategories.update({_id:id},{$set:newsletterCategory});
    },
    updateTopNewsDate : function (id, newDate) {
         console.log("updated >>> " + id + " date " + newDate);
        WhatsnewTopNews.update({_id:id},{$set:{rev : new Date(newDate)}});
    },
    setTopNews : function (id) {
        WhatsnewTopNews.update({current:1},{$set:{current:0}});
        WhatsnewTopNews.update({_id:id},{$set:{current:1}});
    }
    
});
