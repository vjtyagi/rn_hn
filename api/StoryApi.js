var Q = require("q"),
	_ = require("lodash"),
	config = require("../config/config"),
	StoryTypes = require("../constants/StoryTypes"),
	ServerActionCreators = require("../actions/ServerActionCreators"),
	responseFormat = ".json";



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
					ServerActionCreators.loadedStories({
						type: storyType,
						stories: data
					});
				})
				.catch(function(data){
					ServerActionCreators.failedToLoadStories({
						type: storyType,
						message: "Failed to load stories"
					});
				}).done();

		} else {
			ServerActionCreators.loadedStories({
				type: storyType,
				stories: []
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