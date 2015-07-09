var Q = require("q"),
	_ = require("lodash"),
	config = require("../config/config"),
	StoryTypes = require("../constants/StoryTypes"),
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
		var deferred = Q.defer();
		if( idsToFetch.length ) {

			this._fetchAll(idsToFetch, storyType)
				.then(function(data){
					deferred.resolve({
						stories: data,
						type: storyType
					});
				})
				.catch(function(data){
					deferred.reject(data);
				}).done();

		} else {

			deferred.resolve({
				type: storyType,
				stories: []
			});
		}

		return deferred.promise;
	},
	_fetchAll: function(ids, type){
		var promises = this.getStoryPromises(ids);
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