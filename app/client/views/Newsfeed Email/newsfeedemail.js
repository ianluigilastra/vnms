Template.newsfeedEmail.helpers({
	topNews : function () {
		 _.each(WhatsnewTopNews.find({},{limit:1}),function(doc){

		 });
		return  WhatsnewTopNews.find({},{limit:1}).fetch();
	},
	newProductInfo : function () {
		return  NewProductInfo.find({},{limit:2}).fetch();
	},
	newsletters : function () {
		return  Newsletter.find({},{limit:2}).fetch();
	},
	appNoteTechNote : function () {
		return  Whatsnew.find({},{limit:2}).fetch();
	},
	fastFact : function () {
		return  FastFact.find({},{limit:2}).fetch();
	},
	newsfeedDate : function () {
		if(this.date){
			var mm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
			var d = new Date(this.date);
			return mm[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
		}
	},
	PI : function () {
		if(this.docPi){
			return "<tr style=\"background-color:#d8d8d8 ;width: 100%;height: auto;display: table;\"><td colspan=\"2\" style=\"padding-right:10px\" align=\"right\">Click here to <a href=\"#\">view</a> all Poprietary Info Documents (PIs)</td></tr>"
		}
	},
	domainName : function () {
		return "http://lxmv90.corp.vishayint.com:8080";
	}

});
Template.newsfeedEmail.onDestroyed(function(){
	console.log('it was destroyed')
});

Template.newsfeedEmail.onRendered(function(){
	$('.input-group.date').datepicker({
    	todayBtn: "linked",
    	autoclose: true
    });

	if(window.location.href.indexOf('date') == -1 && window.location.href.indexOf('period') == -1){
		console.log('this was executed')
		$('#email-setter').modal('show');
	}
		
		
});

Template.newsfeedEmail.events({
	'click button#btn-set-ok' : function (e,t) {
		e.preventDefault();
		console.log('this is executed')
		var period = $('#sel-period').val();
		var date = $('#txt-date').val();
		var queryString = ''; 
		if(period && date){
		queryString = queryString + 'period='+ period
		queryString = queryString + '&date=' + date
		}else{
			if(period && !date){
				queryString = queryString + 'period='+ period
			}else{
				if(date && !period){
					queryString = queryString + 'date=' + date
				}
			}
		}
		Router.go('newsfeedEmail',{},{query:queryString});
		location.reload();
	},
	'click button#btn-send-mail' : function (e,t) {
		e.preventDefault();
		$('#send-email').modal('show');
	},
	'click button#btn-set-mail' : function (e,t) {
		e.preventDefault();
		$('#email-setter').modal('show');
	},
	'click button#btn-send' : function (e,t) {
		e.preventDefault();
		var to = $('#txt-to').val();
		var cc = $('#txt-cc').val();
		var subj = $('#txt-subject').val();
		var imgSrcs = [];
		var emailContent = $('#body-body').html();
		$('table#newsItems img').each(function(idx){
		var nameString = $(this).attr('src') 
		var filename = nameString.split("/").pop();
		var path = "/var/www.vishay.com/static/public/newsfeed/img/" + filename
		imgSrcs.push({ cid:"image" + idx,filePath :path, replace:nameString})
		})
		$('table#header img').each(function(idx){
		var nameString = $(this).attr('src') 
		var filename = nameString.split("/").pop();
		var path = "http://"+ window.location.host +"/img/icon/" + filename
		imgSrcs.push({ cid:"header"+idx,filePath :path , replace:nameString})
		})

		_.each(imgSrcs,function(a){
		  emailContent = emailContent.replace(a.replace,"cid:"+a.cid)
		})

		var attachments = [];

		_.each(imgSrcs,function(a){
		 attachments.push({cid:a.cid,filePath:a.filePath})
		});

		var email = {
		from:    "Newsfeed@vishay.com",
		to:      to.split(';'),
		cc: 	 cc.split(';'),
		subject: "Newsfeed ("+this.period+")",
		html:    emailContent,  
		attachmentOptions: attachments
		};

		Meteor.call('sendEmail2',email,function(e,r){
			if(e){
				alert(e.error);
			}else{
				alert("Email Sent!");
			}
		})
	}
});

Template.newsfeedEmail.created = function() {
	var self = this;
	var days;
	this.data.attachments = [];
	console.log(window.location.href.indexOf('date'))
	console.log(window.location.href.indexOf('period'))
	

	if(!this.data.date){
		this.data.date = new Date();
	};
	if(this.data.period){
		if(this.data.period == "weekly"){days=7;};
		if(this.data.period == "monthly"){days=30};
		if(this.data.period == "quarterly"){days=120};
	}else{
		days=7;
	}

		console.log(this);
		console.log("days >> " + days);
		toDate = new Date(this.data.date);
		frmDate = new Date(toDate.getTime() - (days * 24 * 60 * 60 * 1000));
		console.log("from >> " + frmDate + " to >>  " + toDate)
	self.autorun(function(){
		self.subscribe("WhatsnewTopNews",{selector:{rev:{$gte:frmDate,$lte:toDate}},options:{sort:{rev:-1}}});
		self.subscribe("NewProductInfo", {selector:{rev:{$gte:frmDate,$lte:toDate}},options:{sort:{rev:-1}}});
		self.subscribe("Newsletter",{selector:{date:{$gte:frmDate,$lte:toDate}},options:{sort:{_id:-1}}});
    	self.subscribe("newsletterCategories",{selector:{},options:{}});
		self.subscribe("Categories",{selector:{},options:{}});
		self.subscribe("Whatsnew",{selector: {$or:[{documentType:"Application Notes"},{documentType:"Technical Notes"}]},options:{}});
		self.subscribe("FastFact",{selector:{rev:{$gte:frmDate,$lte:toDate}},options:{sort:{rev:-1}}});
    });

};