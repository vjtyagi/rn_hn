var React = require("react-native");
var config = require('./config');
var moment = require('moment');
var URL = require("url");
var {
	View,
	Text,
	StyleSheet,
	ListView,
	TouchableHighlight,
} = React;

var apiUrl = config.API_HOST;
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

		fetch(apiUrl)
		.then( response => response.json())
		.then((items) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(items),
				loaded: true
			});

		});

	},
	getHostName: function(url){
		return URL.parse(url).hostname;
	},
	renderPost: function(postData){
		var time = moment(postData.time*1000).fromNow();
		var hostName = this.getHostName(postData.url);
		return (
			<TouchableHighlight>
				<View style={styles.postContainer}>
					<View>
						<Text style = {styles.title}>{postData.title}</Text>
						<Text style = {styles.host}>{hostName}</Text>
					</View>
					<View style={styles.descriptions}>
						<View style={styles.info_container}>
							<Text style={styles.info}>{time + " hours ago by " + postData.by}</Text>
						</View>
						<View style={styles.stats_container}>	
							<Text style={styles.info}>{postData.score + " points | " + postData.descendants + " comments"}</Text>
						</View>
					</View>
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

module.exports = FrontPage;