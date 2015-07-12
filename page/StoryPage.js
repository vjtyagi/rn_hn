const React = require("react-native"),
	SideMenu = require('react-native-side-menu'),
	StoryListView = require("../components/StoryListView"),
	StoryStore = require("../stores/Story"),
	AppConstants = require("../constants/AppConstants"),
	Menu = require("../components/Menu"),
	StoryActionCreators = require("../actions/StoryActionCreators");

const CHANGE_EVENT = AppConstants.events.CHANGE;

var {
	View,
	Text,
} = React;

function initialRequest(props){
	console.log("initialRequest called");
	StoryActionCreators.initializeStories(props.type);
}

function getState(props){
	return StoryStore.getAll(props.type);
}

var StoryPage = React.createClass({
	getInitialState: function(){
		return getState(this.props);
	},
	componentDidMount: function(){
		StoryStore.addEventListener(CHANGE_EVENT, this.onStoryChange);
		initialRequest(this.props);
	},
	componentWillUnmount: function(){
		StoryStore.removeListener(CHANGE_EVENT, this.onStoryChange);
	},
	onStoryChange: function(){
		this.setState(getState(this.props));
	},
	render: function(){
		var menu = <Menu navigator={this.props.navigator} />;
		return (
			<SideMenu menu={menu}>
				<StoryListView 
				isLoading={this.state.isLoading}
				stories={this.state}
				type={this.props.type} />
			</SideMenu>
		);
		
	},
	loadMore: function(){
		StoryActionCreators.loadMoreStories(props);
	}
});


module.exports = StoryPage;