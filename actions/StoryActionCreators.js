var Q = require("q"),
	HNDispatcher = require("../dispatcher/HNDispatcher"),
	StoryApi = require("../api/StoryApi"),
	ActionTypes = require("../constants/ActionTypes"),
	StoryTypes = require("../constants/StoryTypes");

var StoryActionCreators = {
	initializeStories: function(type){
		this._dispatchLoadingAction();
		this.fetchStoryIds(type);
	},
	loadMoreStories: function(type){
		this._dispatchLoadingAction();
		this.fetchStories(type);
	},
	fetchStoryIds: function(storyType){
		
		StoryApi.fetchStoryIds(type)
			.then(function(data){
				HNDispatcher.dispatch({
					type: ActionTypes.STORY_IDS_LOAD_SUCCESS,
					data: data
				});
			})
			.catch( function(data){
				HNDispatcher.dispatch({
					type: ActionTypes.STORY_IDS_LOAD_FAILURE,
					data: data
				});
			}).done();
	},
	fetchStories: function(type){

		StoryApi.fetchStories(type)
		.then( function(data){
			HNDispatcher.dispatch({
				type: ActionTypes.LOADING_STORIES_SUCCESS,
				data: data
			});
		})
		.catch( function(data){
			HNDispatcher.dispatch({
				type: ActionTypes.LOADING_STORIES_FAILURE,
				data: data
			});
		}).done();
		
	},
	_dispatchLoadingAction: function(){
		this.dispatch({type: ActionTypes.LOADING_DATA});
	}
};

module.exports = StoryActionCreators;