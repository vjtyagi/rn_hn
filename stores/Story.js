var {EventEmitter} = require("events"),
	HNDispatcher = require("../dispatcher/HNDispatcher"),
	assign = require("object-assign"),
	ActionTypes = require("../constants/ActionTypes"),
	StoryTypes = require("../constants/StoryTypes"),
	_ = require("lodash"),
	StoreUtils = require("../utils/StoreUtils");

const CHANGE_EVENT = "change";
const PAGE_SIZE = 10;

var _cache = {},
	_stories = {
		[StoryTypes.TOP_STORIES]: {
			ids: [],
			values: [],
			pagination: {
				pageCount: null,
				currentPage: 1,
				total: 0
			}
		},
		[StoryTypes.NEW_STORIES]: {
			ids: []
		},
		[StoryTypes.ASK_HN]: {
			ids: []
		},
		[StoryTypes.SHOW_HN]: {
			ids: []
		},
		[StoryTypes.HN_JOBS]: {
			ids: []
		}
	};

function updateCache(stories){
	_.each(stories, function(story){
		_cache[story.id] = story;
	}, this);
}

function updateStories({stories, type}){
	updateCache(stories);
	updateStoriesByType(stories, type);
}

function initialRequest(storyIds, type){
	updateStoryIds(type);
}

function updateStoryIds(storyIds, type){
	_stories.type.ids = _stories.type.ids.concat(storyIds);
}

function updateStoriesByType(stories, type){
	_stories[type].ids = _stories[type].ids.concat( _.pluck(stories, "id") );

}


function loadMoreByType(type){
	_stories[type].pagination.currentPage += 1

}

function paginateStories(type) {
	var stories = _stories[type],
		end = stories.pagination.currentPage *  PAGE_SIZE;

	return _.slice(stories.ids, 0, end);
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
		},
		getStoriesByType: function(type){	
			return _.map(paginateStories(type), function(storyId){
				return _cache[storyId];
			}, this);
		}
});

HNDispatcher.register(function(action){

	switch(action.type){
		case ActionTypes.LOAD_MORE_SUCCESS:
			updateStories({stories: action.data.stories, type: action.data.storyType});
			Story.emitChange();
			break;
		case ActionTypes.INITIAL_REQUEST_SUCCESS:
			initialRequest(action.data.ids, type: action.data.storyType);
			//trigger an action here to fetch the actual data.
			break;
		
		default:
	}
});

module.exports = Story;