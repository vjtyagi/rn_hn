var Q = require("q"),
	HNDispatcher = require("../dispatcher/HNDispatcher"),
	StoryApi = require("../api/StoryApi"),
	ActionTypes = require("../constants/ActionTypes");
	
var StoryActionCreators = {
	initializeStories: function(type){
		this._dispatchLoadingAction();
		this.fetchStoryIds(type);
	},
	loadMoreStories: function(type){
		HNDispatcher.dispatch({
			type: ActionTypes.LOAD_MORE_STORIES,
			data: {
				type: type
			}
		});
	},
	fetchStoryIds: function(type){
		console.log("fetchStoryIds called");
		console.log("type "+ type);
		StoryApi.fetchStoryIds(type);
	},
	_dispatchLoadingAction: function(){
		HNDispatcher.dispatch({type: ActionTypes.LOADING_DATA});
	}
};

module.exports = StoryActionCreators;