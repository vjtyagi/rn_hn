var Q = require("q"),
	_ = require("lodash"),
	config = require("../config"),
	StoryTypes = require("../constants/StoryTypes"),
	responseFormat = ".json"

var StoryApi = {

	/*
	* @returns a Q<Promise>
	**/
	fetchStoryIds: function(storyType){	
		return this._fetchJSONPromise(StoryTypes[storyType] + "_URL");
	},
	fetchStories: function (storyType, ids) {
		switch(storyType){
			case StoryTypes.TOP_STORIES: 
				return this.fetchTopStories(ids)
				break;
			case StoryTypes.NEW_STORIES:
				return this.fetchNewStories(ids);
				break;
			case StoryTypes.ASK_HN:
				return this.fetchAskHN(ids);
				break;
			case StoryTypes.SHOW_HN:
				return this.fetchShowHN(ids);
				break;
			case StoryTypes.HN_JOBS:
				return this.fetchJobs(ids);

			default:
		}
	},
	fetchNewStories: function(){
		return this.fetchAll(ids, "getNewStoryPromise");
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
	getNewStoryPromise: function(id){
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