var StoryStore = require("../stores/Story"),
	Q = require("q"),
	HNDispatcher = require("../dispatcher/HNDispatcher"),
	StoryApi = require("../api/StoryApi"),
	ActionTypes = require("../constants/ActionTypes"),
	StoryTypes = require("../constants/StoryTypes");

var StoryActionCreators = {

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
	loadMore: function(props){
		var ids = StoryStore.getIdsToLoad(props.type);
		//dispatch a loading action
		this.dispatch({type: ActionTypes.LOADING_STORIES, data: {}});

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