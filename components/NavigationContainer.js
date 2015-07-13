const React = require("react-native");
const StoryTypes = require("../constants/StoryTypes");
const StoryPage = require("../page/StoryPage");
var {
	Navigator,
	StyleSheet,
	Text
} = React;


var navigationRouteMapper = {
	LeftButton: function(route, navigator, index, navState){
		console.log("route details");
		console.log(route);
		console.log(navigator);
		console.log(index);
		console.log(navState);

		if( index === 0 ){
			return null; // return the icon for toggling menu
		}

		return null;

	},
	RightButton: function(route, navigator, index, navState){
		return null;
	},
	Title: function(route, navigator, index, navState){
		return (
			<Text style={[styles.navBarText, styles.navBarTitleText]}>
				{route.title}
			</Text>
		);
	}
};

var NavigationContainer = React.createClass({

	renderScene: function(route, navigator){
		switch(route.title){
			case StoryTypes.TOP_STORIES:
			case StoryTypes.NEW_STORIES:
			case StoryTypes.ASK_HN:
			case StoryTypes.SHOW_HN:
			case StoryTypes.HN_JOBS:
				return <StoryPage type={route.title} navigator = {navigator} />;
				break;

			case "comments":
				//Todo: change this to comments page
				return <StoryPage type = {route.title} navigator = {navigator}/>;
				break;
			default:
				return <StoryPage type={StoryTypes.TOP_STORIES} navigator = {navigator} />;
		}

	},
	render: function(){
		return (
			<Navigator 
				initialRoute={{title: StoryTypes.TOP_STORIES, index: 0}}
				renderScene = {this.renderScene}
				navigationBar={
					<Navigator.NavigationBar 
					routeMapper={navigationRouteMapper}
					style={styles.navBar}/>
				}/>
		);
	}
});

var styles = StyleSheet.create({
	navBar: {
		backgroundColor: "#F07530"
	},
	navBarText: {
		fontSize: 16,
    	marginVertical: 10,
	},
	navBarTitleText: {
		fontWeight: '500',
    	marginVertical: 9,
    	color: "#fff"
	}
});

module.exports = NavigationContainer;