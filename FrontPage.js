var React = require("react-native");
var config = require('./config');
var moment = require('moment');
var Comments = require("./CommentsPage");
var util = require('./util');
var FireBase = require('firebase');
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
	componentWillMount: function(){
		this.testFirebase();
	},
	componentDidMount: function(){
		this.fetchData();
		
	},
	testFirebase: function(){
		this.firebaseRef = new FireBase(config.FIREBASE_URL).child("topstories");
		this.firebaseRef.on("value", function(topstories){
			console.log("top stores");
			console.log(topstories.val());
		});
	},
	fetchData: function(){
		// make an ajax call and setState
		
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
	onPostSelected: function(postData){
		this.props.navigator.push({
			title: postData.title,
			component: Comments,
			passProps: {post: postData}
		});
	},
	renderPost: function(postData){
		var time = moment(postData.time*1000).fromNow();
		var hostName = util.getHostName(postData.url);
		return (
			<TouchableHighlight
				underlayColor="#E4E4E4"
				onPress={()=> this.onPostSelected(postData)}
				>
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