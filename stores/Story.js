var _ = require("lodash"),
	HNDispatcher = require("../dispatcher/HNDispatcher"),
	ActionTypes = require("../constants/ActionTypes"),
	StoryTypes = require("../constants/StoryTypes"),
	StoreUtils = require("../utils/StoreUtils"),
	AppConstants = require("../constants/AppConstants"),
	StoryApi = require("../api/StoryApi");

const CHANGE_EVENT = AppConstants.events.CHANGE;
const PAGE_SIZE = 10;

var _cache = {},
	_pagination = {
		nextPage: 1
	},
	_stories = {
		isLoading: false,
		TOP_STORIES: {
			ids: [],
			initialized: false,
			values: []
		},
		NEW_STORIES: {
			ids: [],
			initialized: false,
			values: []
		},
		ASK_HN: {
			ids: [],
			initialized: false,
			values: []
		},
		SHOW_HN: {
			ids: [],
			initialized: false,
			values: []
		},
		HN_JOBS: {
			ids: [],
			initialized: false,
			values: []
		}
	};

function updateCache(stories){
	_.each(stories, function(story){
		_cache[story.id] = story;
	}, this);
}


function updateStoreState(update){
	_stories = _.extend(_stories, update);
}


function paginateStories(type) {
	var stories = _stories[type],
		end = _pagination.nextPage *  PAGE_SIZE;

	return _.slice(stories.ids, 0, end);
}



function handleNewStories(data){
	//check if there's any data to update
	_stories.isLoading = false;
	updateCache(data.stories);
	_stories[data.type].values = getStoriesFromCache(paginateStories(data.type));
	_pagination.nextPage += 1;
}

function getStoriesFromCache(ids){
	return _.map(ids, function(id){
		return _cache[id];
	});
}

function loadStories(data){
	_stories.isLoading = true;
	var idsToFetch = Story.getIdsToFetch(data.type);
	StoryApi.fetchStories(data.type, idsToFetch);
}


function handleStoryIds(data){
	_stories[data.type].ids = data.ids;
	_stories[data.type].initialized = true;
	//trigger action for loading the stories
	var idsToFetch = Story.getIdsToFetch(data.type);
	StoryApi.fetchStories(data.type, idsToFetch);
}


var Story = StoreUtils.createStore({
		contains: function(id){
			return _.has(_cache, id);
		},
		get: function(id){
			return _cache[id];
		},
		getIdsToFetch: function(type){
			return _.reject(paginateStories(type), function(storyId){
				return !! _cache[storyId];
			}, this);
		},
		getStoriesByType: function(type){
			return _stories[type];
		},
		getAll: function(){
			return _stories;
		},
		hasMore: function(type){
			// check if there are ids corresponding to that type
			var hasMore = false;
			//all of the ids present in the array have not been fetched.
			if(! _stories[type].ids.length || (_stories[type].ids.length > _stories[type].values.length) ){
				hasMore = true;
			}
			return hasMore;
		},
		getIdsByType: function(type){
			return _stories[type].ids;
		}
});

HNDispatcher.register(function(action){

	switch(action.type){
		case ActionTypes.LOADING_DATA:
			updateStoreState({isLoading: true});
			Story.emitChange();
			break;
		case ActionTypes.STORY_IDS_LOAD_SUCCESS:
			handleStoryIds(action.data);
			break;
		case ActionTypes.LOADING_STORIES_SUCCESS:
			handleNewStories(action.data);
			Story.emitChange();
			break;
		case ActionTypes.LOAD_MORE_STORIES:
			loadStories(action.data);
			Story.emitChange();
			break;

		default:
	}
});

console.log("StoryStore");
console.log(Story);

module.exports = Story;