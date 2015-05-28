var React = require("react-native");
var util = require("./util");
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
		return (
			<View style = {styles.container}>
				<TouchableHighlight
				 underlayColor="#F6F6EF"
				 onPress={()=>this._linkPressed(post.url)}>
					<Text style={styles.link}>{host}</Text>
				</TouchableHighlight>
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
		color: '#F07530',
		fontSize: 15,
		marginTop: 10,
		marginLeft: 10,
		fontWeight: 'bold'
	
	}
});

module.exports = Comments;