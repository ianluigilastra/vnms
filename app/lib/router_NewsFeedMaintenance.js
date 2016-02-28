Router.map( function () {
	this.route('home', {
	    path: '/apps/newsfeed',
	    template: 'home',
	    layoutTemplate: 'layout'
	});

	this.route('/', function(){
		this.redirect('/apps/newsfeed');
	});

	
	this.route('topNews', {
	    path: '/apps/newsfeed/top-news',
	    template: 'topNews',
	    layoutTemplate: 'layout'
	});
	
	this.route('newProductinfo', {
	    path: '/apps/newsfeed/new-product-info',
	    template: 'newProductinfo',
	    layoutTemplate: 'layout'
	});
	
		this.route('addNewProductinfo', {
		    path: '/apps/newsfeed/new-product-info/add-new-product-info',
		    template: 'addNewProductInfo',
	    layoutTemplate: 'layout'
		});

		this.route('editNewProductinfo', {
		    path: '/apps/newsfeed/new-product-info/edit-new-product-info/:_id',
		    template: 'editNewProductInfo',
		    data: function () {
		    	return {id:this.params._id}	
		    },
	    layoutTemplate: 'layout'
		});

		this.route('/apps/newsfeed/new-product-info/view/:_id', {
		    template: 'viewProductInfo',
		    data: function () {
		    	console.log(this.params._id);
		    	return {id:this.params._id}	
		    },
	    layoutTemplate: 'layout'
		});


	this.route('newsletters', {
	    path: '/apps/newsfeed/newsletters',
	    template: 'newsletters',
	    layoutTemplate: 'layout'
	});
	
		this.route('addNewNewsletter', {
		    path: '/apps/newsfeed/newsletters/add-new-newsletter',
		    template: 'addNewNewsletter',
	    layoutTemplate: 'layout'
		});

		this.route('addNewNewsletterCategory', {
		    path: '/apps/newsfeed/newsletters/add-newsletter-category',
		    template: 'addNewsletterCategory',
	    layoutTemplate: 'layout'
		});

		this.route('editNewNewsletter', {
		    path: '/apps/newsfeed/newsletters/edit-new-newsletter/:_id',
		    template: 'editNewNewsletter',
		    data: function () {
		    	return {id:this.params._id}	
		    },
	    layoutTemplate: 'layout'
		});

		this.route('/apps/newsfeed/newsletters/view/:_id', {
		    template: 'viewNewsletter',
		    data: function () {
		    	console.log(this.params._id);
		    	return {id:this.params._id}	
		    },
	    layoutTemplate: 'layout'
		});

	this.route('appNoteTechNotes', {
	    path: '/apps/newsfeed/app-note-tech-notes',
	    template: 'appNoteTechNotes',
	    layoutTemplate: 'layout'
	});
	
	this.route('literatureLibrary', {
	    path: '/apps/newsfeed/literature-library',
	    template: 'literatureLibrary',
	    layoutTemplate: 'layout'
	});
	
	this.route('fast facts', {
	    path: '/apps/newsfeed/fast-facts',
	    template: 'fastFacts',
	    layoutTemplate: 'layout'
	});
		
		this.route('addNewFastFacts', {
	    	path: '/apps/newsfeed/fast-facts/add-new-fastFacts',
	    	template: 'addNewFastFacts',
	    layoutTemplate: 'layout'
		});

		this.route('editNewFastFacts', {
	    	path: '/apps/newsfeed/fast-facts/edit-new-fastFacts/:_id',
	    	template: 'editNewFastFacts',
	    	data: function () {
		    	return {id:this.params._id}	
		    },
	    layoutTemplate: 'layout'
		});

		this.route('/apps/newsfeed/fast-facts/view/:_id', {
		    template: 'viewFastFacts',
		    data: function () {
		    	console.log(this.params._id);
		    	return {id:this.params._id}	
		    },
	    layoutTemplate: 'layout'
		});

	this.route('whatsNewOnVishayCom', {
	    path: '/apps/newsfeed/whats-new-on-vishay',
	    template: 'whatsNewOnVishayCom',
	    layoutTemplate: 'layout'
	});


		this.route('addWhatsNew', {
		    path: '/apps/newsfeed/whats-new-on-vishay/add-whats-new',
		    template: 'addWhatsNew',
	    layoutTemplate: 'layout'
		});

		this.route('editWhatsNew', {
		    path: '/apps/newsfeed/whats-new-on-vishay/edit-whats-new/:_id',
		    template: 'editWhatsNew',
		    data: function () {
		    	return {id:this.params._id}	
		    },
	    layoutTemplate: 'layout'
		});

		this.route('/apps/newsfeed/whats-new-on-vishay/view/:_id', {
		    template: 'viewWhatsNew',
		    data: function () {
		    	console.log(this.params._id);
		    	return {id:this.params._id}	
		    },
	    layoutTemplate: 'layout'
		});

	this.route('newsfeedEmail', {
	    path: '/apps/newsfeed/newsfeed-email',
	    template: 'newsfeedEmail',
	    layoutTemplate: 'emailLayout',
	    data : function () {
	    	return this.params.query;
	    }
	});
	
	this.route('newsfeedSubscriber', {
	    path: '/apps/newsfeed/newsfeed-subscriber',
	    template: 'newsfeedSubscriber',
	    layoutTemplate: 'layout'
	});


	this.route('featureAnnouncements', {
	    path: '/apps/newsfeed/feature-announcements',
	    template: 'featureAnnouncements',
	    layoutTemplate: 'layout'
	});


		this.route('addFeatureAnnouncements', {
		    path: '/apps/newsfeed/feature-announcements/add-feature-announcements',
		    template: 'addFeatureAnnouncements',
	    layoutTemplate: 'layout'
		});

		this.route('editFeatureAnnouncements', {
		    path: '/apps/newsfeed/feature-announcements/edit-feature-announcements/:_id',
		    template: 'editFeatureAnnouncements',
		    data: function () {
		    	return {id:this.params._id}	
		    },
	    layoutTemplate: 'layout'
		});

		this.route('/apps/newsfeed/feature-announcements/view/:_id', {
		    template: 'viewFeatureAnnouncements',
		    data: function () {
		    	return {id:this.params._id}	
		    },
	    layoutTemplate: 'layout'
		});

	this.route('loading',{
		path:'/loading',
		template:'preloader',
	    layoutTemplate: 'layout'
	});

	this.route('testPage',{
		path:'/testpage',
		template:'testPage',
	    layoutTemplate: 'layout'
		
	});
});