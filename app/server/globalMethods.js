Meteor.methods({
	transferWebUpdate : function () {
		FastFact.find({categoryId:null,description:/web update/i}).forEach(function (doc){
			console.log(doc)
			whatsNewOnVishay.insert({
				"_id" : new Mongo.ObjectID(),
				"rev" :doc.rev,
    			"description" : doc.description,
    			"fileName" : doc.fileName,
    			"categoryId" : doc.categoryId
    		});
		});

		console.log("TRANSFER COMPLETE")
	},
	updateNewsletterDate : function () {
		Newsletter.find().forEach(function (doc){
 			date1 = new Date(doc.date);
	 		Newsletter.update({_id : doc._id},{$set:{date : date1}},{upsert:false, multi:true});
		});
	
		featureAnnouncements.find().forEach(function (doc){
 			date1 = new Date(doc.date);
	 		featureAnnouncements.update({_id : doc._id},{$set:{date : date1}},{upsert:false, multi:true});
		});
	},
	sendEmail: function (to, from, subject, html, attachments) {
    check([to, from, subject, html], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    		this.unblock();

		    Email.send({
		      to: to,
		      from: from,
		      subject: subject,
		      html: html,
		      attachments : attachments
		    });
 	 },
 	 sendEmail2: function (email) {
 	 		this.unblock();
 	 		EmailAtt.send(email);
 	 }
});