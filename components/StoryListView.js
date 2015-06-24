const React = require("react-native");

var {
	Text,
	View
} = React;

var StoryListView = React.createClass({
	getInitialState: function(){
		this.stories = [];
		var dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2
		});
		return {dataSource: dataSource};
	},
	render: function(){
		return (
			<View>
				<Text>StoryList View</Text>
			</View>
		);
	}
});


module.exports = StoryListView;