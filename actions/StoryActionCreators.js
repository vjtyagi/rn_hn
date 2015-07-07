var Q = require("q"),
	HNDispatcher = require("../dispatcher/HNDispatcher"),
	StoryApi = require("../api/StoryApi"),
	ActionTypes = require("../constants/ActionTypes"),
	StoryTypes = require("../constants/StoryTypes");

//Todo make the action creators slim
//move all the api call code to api service
//action creators should have simple function with or without args
//which just dispatch some actions with or without data.

var StoryActionCreators = {
	initializeStories: function(type){
		this._dispatchLoadingAction();
		this.fetchStoryIds(type);
	},
	loadMoreStories: function(type){
		this._dispatchLoadingAction();
		this.fetchStories(type);
	},
	fetchStoryIds: function(type){
		console.log("fetchStoryIds called");
		console.log("type "+ type);
		StoryApi.fetchStoryIds(type)
			.then(function(data){
				console.log("storyIds");
				console.log(data);
				HNDispatcher.dispatch({
					type: ActionTypes.STORY_IDS_LOAD_SUCCESS,
					data: {
						type: type,
						ids: data
					}
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
		console.log('fetch stories called '+ type);
		StoryApi.fetchStories(type)
		.then( function(data){
			console.log('fetch stories response');
			console.log(data);
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
		HNDispatcher.dispatch({type: ActionTypes.LOADING_DATA});
	}
};

module.exports = StoryActionCreators;