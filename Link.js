var React = require("react-native");
var {
	Text,
	TouchableHighlight,
	LinkingIOS
}=React;

var Link = React.createClass({
	_linkPressed: function(url){
		LinkingIOS.openURL(url);
	},
	render: function(){
		return (
			<TouchableHighlight 
				underlayColor={this.props.underlayColor}
				onPress = {()=> this._linkPressed(this.props.url)}
				{...this.props}>
				<Text style={this.props.linkStyle}>{this.props.linkText}</Text>
			</TouchableHighlight>
		);
	}
});

module.exports = Link;