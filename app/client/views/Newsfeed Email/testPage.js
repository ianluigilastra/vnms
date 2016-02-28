/*Template.testPage.helpers({
	fastFacts : function () {
		return FastFact.find().fetch();
	},
	cfg : function () {
		return  {
			subscriptionName:'FastFact',
			collection:FastFact,
			resentButtonText: 'Reset', // optional
		pagination: {
				rowsPerPage: 100,
				
			},
			query: {
				selector: {},
				options: {
					sort: [],
					fields: {}				 
				}
			},
			columns: [
				{
					headerHtml: 'date',
					mapToField: 'rev',
					filterable: true,				
					sortable: true
				},
				{ 
					headerHtml: 'Description', 
					mapToField: 'description',
					sortable: true,
				},
			]
		};
		/*end
	}
});

Template.testPage.created = function () {
	self = this;
	self.autorun( function(){
    self.subscribe("FastFact",{selector:{},options:{sort:{rev:-1}}});
    self.subscribe("Categories",{selector:{},options:{}});
    });
}*/