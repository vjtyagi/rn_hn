var assign = require("object-assign"),
	_ = require("lodash"),
	HNDispatcher = require("../dispatcher/HNDispatcher"),
	ActionTypes = require("../constants/ActionTypes"),
	StoryTypes = require("../constants/StoryTypes"),
	StoreUtils = require("../utils/StoreUtils"),
	AppConstants = require("../constants/AppConstants"),
	StoryActionCreators = require("../actions/StoryActionCreators");

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



function paginateStories(type) {
	var stories = _stories[type],
		end = _pagination.nextPage *  PAGE_SIZE;

	return _.slice(stories.ids, 0, end);
}

function updateStoreState(update){
	_stories = _.extend(_stories, update);
}

function handleNewStories(data){
	//check if there's any data to update
	_stories.isLoading = false;
	_stories[data.type].values = _stories[data.type].values.concat(data.stories);
	updateCache(data.stories);
	_pagination.nextPage += 1;
}

function handleStoryIds(data){
	_stories[data.type].ids = data.ids;
	_stories[data.type].initialized = true;
	//trigger action for loading the stories
	StoryActionCreators.fetchStories(data.type);
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
		getPaginatedIds: function(type){
			return paginateStories(type);
		},
		getStoriesByType: function(type){
			return _stories[type];
		},
		getAll: function(){
			return _stories;
		},
		fetchStoriesFromCache: function(storyType){
			var storyIds = getPaginatedIds(storyType), 
				cachedStoryIds = _.filter(storyIds, function(id){
					return !! _cache[id];
				}, this),
				cachedStories = _.map(cachedStoryIds, function(storyId){
					return _cache[storyId];
				}, this);
			return cachedStories;
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

		default:
	}
});

module.exports = Story;