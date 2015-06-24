const React = require("react-native");
const StoryTypes = require("../components/StoryTypes");
const StoryPage = require("../components/StoryPage");
var {
	Navigator
} = React;
var NaviationContainer = React.createClass({

	renderScene: function(route, navigator){
		switch(route.name){
			case StoryTypes.TOP_STORIES:
			case StoryTypes.NEW_STORIES:
			case StoryTypes.ASK_HN:
			case StoryTypes.SHOW_HN:
			case StoryTypes.HN_JOBS:
				return <StoryPage type={route.name} navigator = {navigator} />;
				break;

			case "comments":
				//Todo: change this to comments page
				return <StoryPage type = {route.name} navigator = {navigator}/>;
				break;
			default:
				return <StoryPage type={StoryTypes.TOP_STORIES} navigator = {navigator} />;
		}

	},
	render: function(){
		return (
			<Navigator initialRoute={{name: StoryTypes.TOP_STORIES, index: 0}}
				renderScene = {this.renderScene}
			/>
		);
	}
});

module.exports = NavigationContainer;