var React = require("react-native");
var util = require("./util");
var Link = require("./Link");
var {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	LinkingIOS
}=React;


var Comments  = React.createClass({

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