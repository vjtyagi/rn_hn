
var {EventEmitter} = require('events'),
	assign = require("object-assign");

var CHANGE_EVENT = "change";

var StoreUtils = {

	createStore: function ( spec ) {

		var emitter = new EventEmitter();
		var store = assign({
			emitChange: function () {
				emitter.emit( CHANGE_EVENT );
			},
			addEventListener: function ( callback ) {
				emitter.on( CHANGE_EVENT, callback );
			},
			removeEventListener: function ( callback ) {
				emitter.removeListener( CHANGE_EVENT, callback) ;
			}
		}, spec);

		return store;
	},
	createPaginatedStore: function(){
		
	}
};

module.exports  = StoreUtils;