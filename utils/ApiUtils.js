var config = require("../config/config");
var URL = require('url');

module.exports = {
	getHostName: function(url){
		return URL.parse(url).hostname;

	}
}