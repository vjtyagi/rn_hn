var React = require("react-native"),
	StoryStore = require("../stores/Story"),
	AppConstants = require("../constants/AppConstants"),
	StoryActionCreators = require("../actions/StoryActionCreators");

const CHANGE_EVENT = AppConstants.events.CHANGE;

var {
	View,
	Text
} = React;

function initialRequest(props){
	StoryActionCreators.loadStoryIds(props.type);
}

function getState(props){
	return StoryStore.getStoriesByType(props.type);
}

var StoryPage = React.createClass({
	getInitialState: function(){
		return {
			type: StoryTypes.TOP_STORIES
		};
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
		return (
			<View>
				<Text>Story Page</Text>
			</View>
		);
	},
	loadMore: function(){
		StoryActionCreators.loadMore(props);
	}
});


module.exports = StoryPage;