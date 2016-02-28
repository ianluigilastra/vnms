Meteor.methods({
	deleteFile: function(path){
		if(path) {
			UploadServer.delete(path);
		} 
	}

});
	