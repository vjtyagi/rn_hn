var StoryStore = require("../stores/Story"),
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
	}
};

module.exports = StoryActionCreators;