var {EventEmitter} = require("events"),
	HNDispatcher = require("../dispatcher/HNDispatcher"),
	assign = require("object-assign"),
	ActionTypes = require("../constants/ActionTypes"),
	StoryTypes = require("../constants/StoryTypes"),
	_ = require("lodash"),
	StoreUtils = require("../utils/StoreUtils");

const CHANGE_EVENT = "change";
var _cache = {},
	_stories = {
		[StoryTypes.TOP_STORIES]: [],
		[StoryTypes.NEW_STORIES]: [],
		[StoryTypes.ASK_HN]: [],
		[StoryTypes.SHOW_HN]: [],
		[StoryTypes.HN_JOBS]: []
	};

function updateCache(stories){
	_.each(stories, function(story){
		_cache[story.id] = story;
	}, this);
}

function updateStories(stories, type){
	updateCache(stories)
	updateStoriesByType(stories, type)
}

function updateStoriesByType(stories, type){
	_stories[type] = _stories[type].concat( _.pluck(stories, "id") );
}

var Story = StoreUtils.createStore({
		query: function(type){
			return _stories[type];
		},
		contains: function(id){
			return _.has(_cache, id);
		},
		get: function(id){
			return _cache[id];
		}
});

HNDispatcher.register(function(action){

	switch(action.type){
		case ActionTypes.LOAD_TOP_STORIES:
			updateTopStories(action.stories);
			break;
		

		default:
	}
});

module.exports = Story;