var Q = require("q"),
	_ = require("lodash"),
	config = require("../config"),
	StoryTypes = require("../constants/StoryTypes"),
	responseFormat = ".json"

var StoryApi = {
	fetchStories: function (storyType) {
		switch(storyType){
			case StoryTypes.TOP_STORIES: 
				return this.fetchTopStories()
				break;
			case StoryTypes.NEW_STORIES:
				return this.fetchNewStories();
				break;
			case StoryTypes.ASK_HN:
				return this.fetchAskHN();
				break;
			case StoryTypes.SHOW_HN:
				return this.fetchShowHN();
				break;
			case StoryTypes.JOBS:
				return this.fetchJobs();

			default:
		}
	},
	fetchNewStories: function(){
		return this.fetchAll(ids, "getNewStoriesPromise");
	},
	fetchAskHN: function(){
		return this.fetchAll(ids, "getAskHNPromise");
	},
	fetchShowHN: function(){
		return this.fetchAll(ids, "getShowHNPromise");
	},
	fetchJobs: function(ids){
		return this.fetchAll(ids, "getJobsPromise");
	},
	fetchTopStories: function (ids) {
		return this.fetchAll( ids, "getStoryPromise" )
	},
	_fetchAll: function (ids, promiseGenerator) {
		return Q.all( this._fetchItems(ids, promiseGenerator) )
	},
	_fetchItems: function (ids, promiseGenerator) {
		return _.map(ids, function(itemId){
			return this[promiseGenerator](itemId);
		}, this);
	},
	getStoryPromise: function (id) {
		return this._fetchJSONPromise( config.ITEM_BASE_URL + id  + responseFormat );
	},
	getJobsPromise: function(id){
		return this._fetchJSONPromise( config.ITEM_BASE_URL + id  + responseFormat );
	},
	getNewStoriesPromise: function(id){
		return this._fetchJSONPromise( config.ITEM_BASE_URL + id  + responseFormat );
	},
	getAskHNPromise: function(id){
		return this._fetchJSONPromise( config.ITEM_BASE_URL + id  + responseFormat );
	},
	getShowHNPromise: function(id){
		return this._fetchJSONPromise( config.ITEM_BASE_URL + id  + responseFormat );
	},
	_fetchJSONPromise: function (url) {
		return fetch(url)
				.then(response => response.json())
	}
};

module.exports = StoryApi;