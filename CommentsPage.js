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
var PAGE_SIZE = 10;

var Comments  = React.createClass({

	getInitialState: function(){
		return {
			comments: [],
			isLoading: true,
			page: 1
		}
	},
	componentDidMount: function(){
		this.getComments(this.props.post);
	},
	componentDidUpdate: function(){
		console.log("component did update called");
		console.log("current page " + this.state.page );
		//poor hack
		if(this.state.isLoading)
			this.getComments(this.props.post);
	},
	getComments: function(post){
		var commentIds = this.getCommentIds(post);
		console.log("commentIds");
		console.log(commentIds);
		console.log(post.kids.length);
		var promises = _.map(commentIds, function(commentId){
			return this.getCommentPromise(commentId);
		}, this);

		Q.all(promises)
		 .then((comments) => {
		 	var existingComments = this.state.comments;
		 	var updatedComments = existingComments.concat(comments);
		 	this.setState({
				comments: updatedComments,
				isLoading: false
			});
		 }).done();
	},
	getCommentPromise: function(commentId){
		return fetch(apiURL+commentId)
				.then(response => response.json())
	},
	getCommentIds: function(post){
		var page = this.state.page;
		console.log("page count " + page);
		var total = post.kids.length;
		var offset = (page-1) * PAGE_SIZE;
		var end = offset + PAGE_SIZE;

		return _.slice(post.kids, offset, end);
	},
	_linkPressed: function(url){
		LinkingIOS.openURL(url)
	},
	_onScroll: function(event){
		var nativeEvent = event.nativeEvent,
			threshold = 10,
			scrollProperties = {
			visibleHeight: nativeEvent.layoutMeasurement.height,
			contentHeight: nativeEvent.contentSize.height,
			offsetY: nativeEvent.contentOffset.y
		};
		
		var nearEnd = this._getDistanceFromEnd(scrollProperties) < threshold;
		
		if(nearEnd && this._sentEndForContentHeight !== scrollProperties.contentHeight){
			this._sentEndForContentHeight = scrollProperties.contentHeight;
			this._endReached(event);
		}
	},
	_hasMore: function(){
		var currentRenderedCount = this._getRenderedRecordsCount();
		var resultSetSize = this.props.post.kids.length;
		return resultSetSize > currentRenderedCount ? true: false;
	},
	_getRenderedRecordsCount: function(){
		var currentPage = this.state.page,
			currentPageSize = currentPage * PAGE_SIZE,
			resultSetSize = this.props.post.kids.length;

		return currentPageSize > resultSetSize ? resultSetSize : currentPageSize ;
	},
	_endReached: function(event){
		var nextPage = this.state.page + 1;
		if( this._hasMore() ){

			this.setState({
				page: nextPage,
				isLoading: true
			});

		}
	},
	_getDistanceFromEnd: function(scrollProperties){
		return scrollProperties.contentHeight - scrollProperties.visibleHeight - scrollProperties.offsetY;
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
					contentInset={{top: -50}}
					onScroll={(event)=>{this._onScroll(event)} }
					scrollEventThrottle={200} >
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