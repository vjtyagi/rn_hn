var Q = require("q"),
	_ = require("lodash"),
	config = require("../config"),
	StoryTypes = require("../constants/StoryTypes"),
	StoryStore = require("../stores/Story"),
	responseFormat = ".json"

var StoryApi = {

	/*
	* @returns a Q<Promise>
	**/

	function mergeWithCachedData(cachedStories, serverStories){
		//implement data merging	
	}

	fetchStoryIds: function(storyType){
		return this._fetchJSONPromise(StoryTypes[storyType] + "_URL");
	},
	fetchStories: function (storyType) {
		var deferred = Q.defer(),
			idsToFetch = StoryStore.getIdsToFetch(),
			storiesFromCache = StoryStore.fetchStoriesFromCache(storyType);

		if( idsToFetch.length ) {

			this._fetchAll(idsToFetch, type)
				.then(function(data){
					deferred.resolve(mergeWithCachedData(storiesFromCache, data));
				})
				.catch(function(data){
					deferred.reject(data);
				});

		} else {

			deferred.resolve({
				stories: []
			});
		}

		return deferred.promise;
	},
	isStoryTypeInitialized: function(type){
		return StoryStore.getStoriesByType(type).initialized;
	},
	_fetchAll: function(ids, type){
		var promises = this.getStoryPromises(ids);
		return Q.all( promises );
	},
	_getStoryPromises: function(ids){
		return _.map(ids, function(){
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