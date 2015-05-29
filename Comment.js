var React = require('react-native');
var {
	Text,
	View,
	TouchableHighlight,
	ListView
}=React;

var Comment = React.createClass({
	getInitialState: function(){
		var dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2
		});
		return {
			dataSource: dataSource,
			loading: true
		}
	},
	componentDidMount: function(){
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this.props.comments),
			loading: false
		});
	},
	renderComment: function(comment){
		return (
			<Text>{comment.text}</Text>
		);
	},
	render: function(){
		return (
			<ListView
			  style={styles.comments_container}
			  dataSource={this.state.dataSource}
			  renderRow={this.renderComment} />
			
		);
	}
});


module.exports = Comment;