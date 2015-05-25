var React = require("react-native");
var {
	View,
	Text,
	StyleSheet
}=React;


var Comments  = React.createClass({
	
	render: function(){
		console.log('props');
		console.log(this.props);
		return (
			<View style = {styles.container}>
				<Text style={styles.title}>{this.props.post.title}</Text>
			</View>
		);
	}
});
var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F6F6EF"
	},
	title:{
		fontSize: 15,
		color: '#fff',
		margin: 10,
		fontWeight: 'bold',
		textAlign: 'left'
	}
});

module.exports = Comments;