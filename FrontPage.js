var React = require("react-native");
var {
	View,
	Text,
	StyleSheet,
	ListView,
	TouchableHighlight,
} = React;


var FrontPage = React.createClass({
	getInitialState: function(){
		var dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2
		});
		return {
			dataSource: dataSource,
			loaded: false
		};
	},
	componentDidMount: function(){
		this.fetchData();
	},
	fetchData: function(){
		// make an ajax call and setState
		var dummyPosts = [
			{
				title: "NSA in P/poly: The power of Precomputation",
				hostName: "scottaaronson.com",
				createdAt: "8",
				author: "evanb",
				points: 120,
				comments: 18
			},
			{
				title: "Self promoters tend to misjudge how annoying they are to others",
				hostName: "psychologicalscience.org",
				createdAt: "4",
				author: "Kristiandupont",
				points: 63,
				comments: 33
			}
		];

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(dummyPosts),
			loaded: true
		});
	},
	renderPost: function(postData){
		return (

			<TouchableHighlight>
				<View style={styles.postContainer}>
					<Text style = {styles.title}>{postData.title}</Text>
					<View style={styles.separator}></View>
				</View>
			</TouchableHighlight>
						
		);
	},
	render: function(){
		return (
			<ListView
			  style={styles.postsList}
			  dataSource={this.state.dataSource}
			  renderRow={this.renderPost} />
			
		);
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
		fontWeight: 'bold'
	},
	postsList: {
		flex: 1,
		backgroundColor: '#F6F6EF'
	},
	postContainer: {
		marginTop: 5
	},
	separator: {
		height: 1,
		backgroundColor: '#dddddd'
	}
});

module.exports = FrontPage;