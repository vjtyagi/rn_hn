var React = require('react-native');
var {
	Text,
	View,
	TouchableHighlight,
	ListView,
	PixelRatio,
	StyleSheet,
	ScrollView,
}=React;
var HTMLView = require("react-native-htmlview");

var Comment = React.createClass({
	render: function(){
		var comment = this.props.comment;
		return (
			<View style={styles.commentBody}>
				<HTMLView value = {comment.text} style={styles.commentText} />
				{comment.childItems ? <CommentList comments={comment.childItems} />: null }
			</View>
		);
	}
});

var CommentList = React.createClass({
	renderComment: function(comment){
		return <Comment comment={comment} />
				
	},
	render: function(){
		return (
			<ScrollView>
			  {this.props.comments.map(this.renderComment)}
			</ScrollView>
				
		);
		
	}
});


var styles = StyleSheet.create({
	commentBody: {
		paddingLeft: 10,
		borderLeftColor: "#BBBBBB",
		borderLeftWidth: 1/PixelRatio.get()
	},
	commentText: {
		color: "#828282"
	}
});

module.exports = {
	Comment: Comment,
	CommentList: CommentList
};