const React = require("react-native");
var NavigationContainer = require("../components/NavigationContainer");


var App = React.createClass({
	
	render: function(){
		return (<NavigationContainer ...this.props />)
	}
});



module.exports = App;