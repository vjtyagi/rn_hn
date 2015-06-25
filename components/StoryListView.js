const React = require("react-native");

var {
	Text,
	View,
	ListView
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
			<ListView
				style={styles.postsList}
				dataSource={this.state.dataSource}
				renderRow={this.renderPost}
				onEndReached={this.onEndReached} />
		);
	},
	onEndReached: function(){
		this.props.loadMore();
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#F6F6EF',
		justifyContent: 'center',
		marginTop: 30
	},
	title:{
		fontSize: 15,
		margin: 10,
		fontWeight: 'bold',
		textAlign: 'left'
	},
	postsList: {
		flex: 1,
		backgroundColor: '#F6F6EF'
	},
	postContainer: {
		margin: 10
	},
	separator: {
		height: 1,
		backgroundColor: '#dddddd'
	},
	host: {
		color: '#F07530',
		fontSize: 14,
		marginLeft: 10
	},
	descriptions: {
		flexDirection: "row",
		justifyContent: 'space-between'
	},
	info: {
		fontSize: 12,
		color: '#AAA',
		margin:10
	}
});


module.exports = StoryListView;