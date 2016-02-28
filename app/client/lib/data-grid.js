VISHAY = { document : {} }
VISHAY.document = {}
VISHAY['document']

Template.datagrid.helpers({
	data : function () {
		console.log(collection(this).find().count())
	},
	columns : function () {
		return this.columns
	}
});

Template.datagrid.created = function () {
	var x = this.data
	this.data.a = new ReactiveVar(1);
	Meteor.subscribe(x.subscription,x.query);
}

Template.datagrid.events({
	'click button#test' : function () {
		this.a.set(this.a.get() + 1);
	}
});

function collection(cfg) {
    var res = null;
        res = cfg.collection;

    return res;
}