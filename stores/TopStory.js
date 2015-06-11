var {EventEmitter} = require("events"),
	HNDispatcher = require("../dispatcher/HNDispatcher"),
	assign = require("object-assign"),
	HNConstants = require("../constants/HNConstants");

const CHANGE_EVENT = "change";
var _topStories = {},
	_topStoryIds = [];

//Todo register the store with dispatcher
var TopStory = assign({}, EventEmitter.prototype, {
	
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	getStories: function(){
		return _topStories;
	},
	addEventListener: function(callback){
		this.on(CHANGE_EVENT, callback)
	},
	removeEventListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	}
});

HNDispatcher.register(function(action){

	switch(action.type){

	}
});

module.exports = TopStory;