var React = require("react-native");
var util = require("./util");
var Link = require("./Link");
var config = require("./config")
var {CommentList} = require('./Comment');
var {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	LinkingIOS
}=React;

var apiURL = config.API_HOST + "item/";

var Comments  = React.createClass({

	getInitialState: function(){
		return {
			comments: []
		}
	},
	componentDidMount: function(){
		this.fetchComments(this.props.post)
	},
	fetchComments: function(post){
		var comments = [
			{
				id: 1, 
				text: "This is a comment Adding more text some more text  more text .....",
				childItems: [
					{
						id: 2,
						text: "This is a child comment, add some text , some more text must become multiline, hell yeah",
						childItems: [
							{
								id: 3,
								text: "This is a sub child, this is awesome"
							}
						]
					}
				]
			}
		];

		var url = apiURL+post.kids[0];
		console.log("url");
		console.log(url)
		fetch(url)
		.then( response => response.json())
		.then((comments) => {
			this.setState({
				comments: [comments]
			});

		});
	},
	_linkPressed: function(url){
		LinkingIOS.openURL(url)
	},
	render: function(){
		post = this.props.post;
		host = util.getHostName(post.url);
		console.log("post data");
		console.log(post);
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
				 <View style={styles.separator} />
				 <View style={styles.commentsContainer}>
				 	<Text style={styles.commentsInfo}>{post.descendants} Comments</Text>
				 </View>

				<CommentList comments = {this.state.comments} /> 

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