getCategoryGroupName = function(catId) {
	if(catId){
		var parentId = 99;
		var firstExecute = false;
		if(_.isString(catId)){
				catId = parseInt(catId);
			}
		while(parentId > 2){
			if(!firstExecute){
				filteredCategory = Categories.findOne({id:catId});
				parentId = filteredCategory.parentId;
				firstExecute = true;
			}else{
				filteredCategory = Categories.findOne({id:parentId});
				parentId = filteredCategory.parentId;
			}
			if(parentId <= 2){
				return filteredCategory.categoryName;
							
			}
		}
	}
}

getCategoryName = function(catId){
	if(catId){
	catId = parseInt(catId);
	return Categories.findOne({id:catId}).categoryName;
}
}

getNewsletterCategoryName = function(catId){
	if(catId){
	catId = parseInt(catId);
	return newsletterCategories.findOne({newsletterCategoryId:catId}).categoryName;
	}
}

isThisTopNews = function(id) {
	var ID = new Mongo.ObjectID(id);
	if(WhatsnewTopNews.find({id_:ID,current:1},{}).count() > 0 ){
		return true;
	}else{
		return false;
	}
}