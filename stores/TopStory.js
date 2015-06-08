var {EventEmitter} = require("events"),
	HNDispatcher = require("../dispatcher/HNDispatcher");

const CHANGE_EVENT = "change";

//Todo register the store with dispatcher
class TopStory extends EventEmitter {
	constructor(){
		this._stories = [];
	}

	emitChange(){
		this.emit(CHANGE_EVENT);
	}
}

HNDispatcher.register(function(action){

	switch(action.type){

	}
});

module.exports = TopStory;