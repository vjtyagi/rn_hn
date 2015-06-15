var React = require("react-native"),
	StoryStore = require("../stores/Story"),
	StoryActionCreators = require("../actions/StoryActionCreators");

const CHANGE_EVENT = "change";

function initialRequest(props){

}

function getState(props){

}

var StoryPage = React.createClass({

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
			<div>Story Page</div>
		);
	},
	loadMore: function(){
		StoryActionCreators.loadMore(props);
	}
});


module.exports = StoryPage;