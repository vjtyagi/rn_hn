var React = require('react-native');
var {
	Text,
	View,
	TouchableHighlight,
	ListView,
	PixelRatio,
	StyleSheet,
	ScrollView,
	Image
}=React;
var HTMLView = require("react-native-htmlview");
var moment = require("moment");

var Comment = React.createClass({
	render: function(){

		var comment = this.props.comment;
		var time = moment(comment.time*1000).fromNow();
		return (
			<View style={styles.commentBody}>
				<View style={[styles.disclosureRow, styles.inline]}>
					<Image source={require("image!disclosure90")} style={[styles.muted, styles.disclosure]}/>
					<Text style={[styles.muted]}>
						by {comment.by} {time}
					</Text>
				</View>
				<HTMLView value = {comment.text} style={styles.commentText} />
				{comment.childItems ? <CommentList comments={comment.childItems} />: null }
			</View>
		);
	}
});

var CommentList = React.createClass({
	renderComment: function(comment, index){
		return <Comment comment={comment} key={index} />
				
	},
	render: function(){
		return (
			<View>
				{this.props.comments.map(this.renderComment)}
			</View>
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
	},
	muted: {
		opacity: 0.3
	},
	marginBottom5: {
		marginBottom: 5
	},
	marginTop5: {
		marginTop: 5
	},
	disclosure: {
		width: 14,
		height: 14,
		marginLeft: 2,
		marginRight: 8
	},
	inline: {
		flexDirection: 'row'
	},
	disclosureRow: {
		marginTop: 5,
		marginBottom: 5
	}
});

module.exports = {
	Comment: Comment,
	CommentList: CommentList
};