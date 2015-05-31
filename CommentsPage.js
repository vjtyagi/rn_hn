var React = require("react-native");
var util = require("./util");
var Link = require("./Link");
var config = require("./config");
var Q = require('q');
var _ = require("lodash");
var {CommentList} = require('./Comment');
var {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	LinkingIOS,
	ScrollView,
	ActivityIndicatorIOS
}=React;

var apiURL = config.API_HOST + "item/";

var Comments  = React.createClass({

	getInitialState: function(){
		return {
			comments: [],
			isLoading: true,
			page: 1
		}
	},
	componentDidMount: function(){
		//this.fetchComments(this.props.post);
		this.getComments(this.props.post);
	},
	fetchComments: function(post){
		var url = apiURL+post.kids[0];
		fetch(url)
		.then( response => response.json())
		.then((comments) => {
			this.setState({
				comments: [comments],
				isLoading: false
			});

		});
	},
	getComments: function(post){
		var promises = _.map(post.kids, function(commentId){
			return this.getCommentPromise(commentId);
		}, this);

		Q.all(promises)
		 .then((comments) => {
		 	this.setState({
				comments: comments,
				isLoading: false
			});
		 }).done();
	},
	getCommentPromise: function(commentId){
		return fetch(apiURL+commentId)
				.then(response => response.json())
	},
	_linkPressed: function(url){
		LinkingIOS.openURL(url)
	},
	render: function(){
		post = this.props.post;
		host = util.getHostName(post.url);
		var spinner = this.state.isLoading? 
			(<ActivityIndicatorIOS
				hidden='true'
				size='large' /> ):
			(<View />);

		return (
			<View style = {styles.container}>
				<Text style={styles.postTitle}>{host}</Text>
				<Link
				 	underlayColor="#F6F6EF"
				 	url={post.url}
				 	linkText={'(Source)'}
				 	linkStyle={styles.link}
				 />
				 <Text style={styles.info}>Posted by {post.by} | {post.score} points</Text>
		
				 <View style={styles.commentsContainer}>
				 	<Text style={styles.commentsInfo}>{post.descendants} Comments</Text>
				 </View>
				 <View style={styles.separator} />
				 {spinner}
				<ScrollView
					removeClippedSubviews={true}
					style={styles.commentsContainer}
					contentInset={{top: -50}}>
					<CommentList comments = {this.state.comments} /> 
				</ScrollView>

			</View>
		);
	}
});
var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F6F6EF",
		marginTop: 65
	},
	commentsContainer: {
		backgroundColor: "#F6F6EF",
		paddingLeft: 10,
		paddingRight: 15
	},
	title:{
		fontSize: 15,
		fontWeight: 'bold',	
		color: '#000',
		margin: 10,
		textAlign: 'left'
	},
	link: {
		color: '#3065F0',
		fontSize: 15,
		marginTop: 10,
		marginLeft: 10	
	},
	postTitle: {
		color: '#F07530',
		fontSize: 15,
		marginTop: 10,
		marginLeft: 10,
		fontWeight: 'bold'
	
	},
	separator: {
		height: 1,
		backgroundColor: '#dddddd'
	},
	info: {
		fontSize: 12,
		color: '#AAA',
		margin:10
	},
	commentsInfo: {
		fontSize: 16,
		color: '#AAA',
		margin:10
	}
});

module.exports = Comments;