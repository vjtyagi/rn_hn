var config = require("./config");
var URL = require('url');

module.exports = {
	getHostName: function(url){
		return URL.parse(url).hostname;

	}
}