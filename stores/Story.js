var {EventEmitter} = require("events"),
	HNDispatcher = require("../dispatcher/HNDispatcher"),
	assign = require("object-assign"),
	ActionTypes = require("../constants/ActionTypes"),
	StoreUtils = require("../utils/StoreUtils");

const CHANGE_EVENT = "change";
var _topStories = {},
	_topStoryIds = [];


function updateTopStories(stories){
	_topStories = _topStories.concat(stories);
}

var Story = StoreUtils.createStore({
	getTopStories: function(){
		return _topStories;
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