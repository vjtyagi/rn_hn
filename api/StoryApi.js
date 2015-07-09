var Q = require("q"),
	_ = require("lodash"),
	config = require("../config/config"),
	StoryTypes = require("../constants/StoryTypes"),
	ActionTypes = require('../constants/ActionTypes'),
	HNDispatcher = require("../dispatcher/HNDispatcher"),
	responseFormat = ".json";

function mergeStories(cachedStories, serverStories){
	//implement data merging
	return cachedStories.concat(serverStories);	
}

var StoryApi = {

	/*
	* @returns a Q<Promise>
	**/
	fetchStoryIds: function(storyType){
		return this._fetchJSONPromise(config[StoryTypes[storyType] + "_URL"]);
	},
	fetchStories: function (storyType, idsToFetch) {

		if( idsToFetch.length ) {

			this._fetchAll(idsToFetch, storyType)
				.then(function(data){
					HNDispatcher.dispatch({
						type: ActionTypes.LOADING_STORIES_SUCCESS, 
						data: {
							stories: data,
							type: storyType
						}
					});
				})
				.catch(function(data){
					HNDispatcher.dispatch({
						type: ActionTypes.LOADING_STORIES_FAILURE,
						data: {
							stories: data,
							type: storyType
						}
					});
				}).done();

		} else {

			HNDispatcher.dispatch({
				type: ActionTypes.LOADING_STORIES_SUCCESS,
				data: {
					stories: [],
					type: storyType
				}
			});
		}
	},
	_fetchAll: function(ids, type){
		var promises = this._getStoryPromises(ids);
		return Q.all( promises );
	},
	_getStoryPromises: function(ids){
		return _.map(ids, function(id){
			return this._createStoryPromise(id);
		}, this);
	},
	_createStoryPromise: function(id){
		return this._fetchJSONPromise(config.ITEM_BASE_URL + id + responseFormat );
	},
	_fetchJSONPromise: function (url) {
		return fetch(url)
				.then(response => response.json())
	}
};

module.exports = StoryApi;