var StoryStore = require("../stores/Story"),
	Q = require("q"),
	HNDispatcher = require("../dispatcher/HNDispatcher"),
	StoryApi = require("../api/StoryApi"),
	ActionTypes = require("../constants/ActionTypes"),
	StoryTypes = require("../constants/StoryTypes");

var StoryActionCreators = {

	loadStoryIds: function(type){
		this.dispatch({
			type: ActionTypes.LOADING_STORY_IDS
		});

		StoryApi.fetchStoryIds(type)
		.then((response) => {
			this.dispatch({
				type: ActionTypes.LOADED_STORY_IDS_SUCCESS,
				data: response
			});
		})
		.catch( (response) => {
			this.dispatch({
				type: LOADED_STORY_IDS_FAILURE,
				data: response
			});
		});
	},

	getStoriesByType: function(storyType){
		// consult the store for the data
		// if data not found consult the api
		//dispatchAsync
	},
	getTopStories: function(){
		var cachedStories = StoryStore.query({
			type: StoryTypes.TOP_STORIES,
			criteria: {

			}
		});
	},
	_dispatchLoadingAction: function(){
		this.dispatch({type: ActionTypes.LOADING_MORE_STORIES});
	},
	_fetchStoryIds: function(type){
		return StoryApi.fetchIds(type);
	},
	fetchStories: function(){
		return StoryApi.fetchStories( props.type, ids );
	},
	loadMore: function(props){
		this._dispatchLoadingAction();
		var storyIds = StoryStore.getIdsByType(props.type),
			ids = [];
		if(!storyIds.length) {
			//fetch story Ids
			this._fetchStoryIds( props.type )
			.then(this.fetchStories)
			.catch(this.triggerError);
		} else {
			//check if there are ids to be fetched.
			ids = StoryStore.getIdsToLoad( props.type );
		}

		if(ids.length){

			StoryApi.fetchStories(props.type, ids)
			.then((stories) => {

				this.dispatch({
					type: ActionTypes.LOAD_MORE_SUCCESS,
					data: {
						storyType: props.type,
						stories: stories
					}
				});
			})
			.catch( (response) => {

				this.dispatch({
					type:  ActionTypes.LOAD_MORE_FAILURE,
					message: "could not load stories"
				});

			}).done();

		} else {
			payload = {
				type : ActionTypes.NO_RECORDS_TO_FETCH,
				data: {
					storyType: props.type,
					stories: []
				}
			}
			this.dispatch(payload);
		}
	},
	dispatch: function(payload){
		HNDispatcher.dispatch(payload);
	}
};

module.exports = StoryActionCreators;