var React = require("react-native");
var config = require('./config');
var moment = require('moment');
var Comments = require("./CommentsPage");
var util = require('./util');
var FireBase = require('firebase');
var _ = require("lodash");
var Q = require('q');
var {
	View,
	Text,
	StyleSheet,
	ListView,
	TouchableHighlight,
} = React;

var apiUrl = config.API_HOST;
var PAGE_SIZE = config.PAGE_SIZE;
var FrontPage = React.createClass({
	getInitialState: function(){
		this.stories = [];
		var dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2
		});
		return {
			dataSource: dataSource,
			loaded: false,
			page: 1,
			stories: []
		};
	},
	componentWillMount: function(){
		this.testFirebase();
	},
	componentDidMount: function(){
		this.fetchData();
		
	},
	testFirebase: function(){
		fetch(config.TOPSTORIES_URL)
		.then(response => response.json())
		.then(topstories => {
			this.stories = topstories;
			this.getTopStories();
		});

	},
	getTopStories: function(){
		var storyIds = this.getStoryIds(this.stories);
		var promises = _.map(storyIds, function(storyId){
			return this.getStoryPromise(storyId);
		}, this);

		Q.all(promises)
		.then((stories) =>{
			console.log("stories fetched");
			console.log(stories);
		}).done();
		
	},
	getStoryPromise: function(storyId){
		return fetch(config.ITEM_URL+storyId+'.json')
			   .then(response => response.json())
	},
	processData:  function(topstories){
		this.stories = topstories.val();

	},
	getStoryIds: function(topstories){
		var page = this.state.page,
			offset = (page-1) * PAGE_SIZE,
			end = offset + PAGE_SIZE;

		return _.slice(topstories, offset, end);
	},
	loadStories: function(storyIds){

	},
	paginateStories: function(topstories){
		//check the current page
		// avoid new additions, only pagination matters
		// use once ? this would ensure all the ids are fetched and we
		// can paginate stuff accordingly
		// for newly added data pull to refresh is the best option
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