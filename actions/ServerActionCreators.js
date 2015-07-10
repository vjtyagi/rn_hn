var ActionTypes = require("../constants/ActionTypes"),
    HNDispatcher = require("../dispatcher/HNDispatcher");
    
    
var ServerActionCreators = {
    loadedStories: function(payload){
        HNDispatcher.dispatch({
            type: ActionTypes.LOADING_STORIES_SUCCESS,
            data: payload
        });
    },
    failedToLoadStories: function(payload){
        HNDispatcher.dispatch({
            type: ActionTypes.LOADING_STORIES_FAILURE,
            data: payload
        });
    },
    loadedStoryIds: function(payload){
        HNDispatcher.dispatch({
            type: ActionTypes.STORY_IDS_LOAD_SUCCESS,
            data: payload
        });
    },
    failedToLoadStoryIds: function(payload){
        HNDispatcher.dispatch({
            type: ActionTypes.STORY_IDS_LOAD_FAILURE,
            data: payload
        });
    }
};

module.exports = ServerActionCreators;