var keyMirror = require("key-mirror");

var storyTypes = keyMirror({
	TOP_STORIES: null,
	NEW_STORIES: null,
	ASK_HN: null,
	SHOW_HN: null,
	HN_JOBS: null
});

module.exports = storyTypes;