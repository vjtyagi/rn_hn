var StoryTypes = require("../constants/StoryTypes");
var config = {
	API_HOST: "http://api.hackernewsmobile.com/",
	PAGE_SIZE: 10,
	threshold: 20,
	ITEM_BASE_URL: "https://hacker-news.firebaseio.com/v0/item/",
	[StoryTypes.TOP_STORIES + "_URL"]: "https://hacker-news.firebaseio.com/v0/topstories.json",
	[StoryTypes.NEW_STORIES + "_URL"]: "https://hacker-news.firebaseio.com/v0/newstories.json",
	[StoryTypes.ASK_HN + "_URL"]: "https://hacker-news.firebaseio.com/v0/topstories.json",
	[StoryTypes.SHOW_HN + "_URL"]: "https://hacker-news.firebaseio.com/v0/topstories.json",
	[StoryTypes.HN_JOBS + "_URL"]: "https://hacker-news.firebaseio.com/v0/topstories.json"
};
module.exports = config;	