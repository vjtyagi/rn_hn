var Q = require("q"),
	_ = require("lodash"),
	config = require("../config"),
	responseFormat = ".json"

var StoryApi = {
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
	_fetchJSONPromise: function (url) {
		return fetch(url)
				.then(response => response.json())
	}
};

module.exports = StoryApi;