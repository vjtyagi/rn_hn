var React = require("react-native");
var util = require("./util");
var {
	View,
	Text,
	StyleSheet
}=React;


var Comments  = React.createClass({
	
	render: function(){
		post = this.props.post;
		host = util.getHostName(post.url);
		return (
			<View style = {styles.container}>
				<Text style={styles.title}>{post.title}</Text>
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
	}
});

module.exports = Comments;