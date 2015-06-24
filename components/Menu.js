const React = require("react-native"),
	StoryTypes = require("../constants/StoryTypes");
var {
	Text,
	View
} = React;

var Menu = React.createClass({
	_onSelect: function(storyType){
		this.props.menuActions.close();
		this.props.navigator.push({
			name: storyType
		});
	},
	render: function(){
		return (
				<View>
					<Text onPress={()=> {this._onSelect(StoryTypes.TOP_STORIES)} }>Top Stories</Text>
					<Text onPress={()=> {this._onSelect(StoryTypes.NEW_STORIES)} }>New Stories</Text>
					<Text onPress={()=> {this._onSelect(StoryTypes.ASK_HN)} }>Ask HN</Text>
					<Text onPress={()=> {this._onSelect(StoryTypes.SHOW_HN)} }>Show HN</Text>
					<Text onPress={()=> {this._onSelect(StoryTypes.HN_JOBS)} }>HN Jobs</Text>
				</View>
		);
	}
});


module.exports = Menu;