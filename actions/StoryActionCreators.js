var StoryStore = require("../stores/Story"),
	Q = require("q"),
	HNDispatcher = require("../dispatcher/HNDispatcher"),
	StoryApi = require("../api/StoryApi"),
	ActionTypes = require("../constants/ActionTypes"),
	StoryTypes = require("../constants/StoryTypes");

var StoryActionCreators = {

	fetchStoryIds: function(storyType){
		this._dispatchLoadingAction();
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
		this._dispatchLoadingAction();

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
	},
	fetchStories: function(){
		return StoryApi.fetchStories( props.type, ids );
	},
	loadMore: function(props){

	},
	dispatch: function(payload){
		HNDispatcher.dispatch(payload);
	}
};

module.exports = StoryActionCreators;