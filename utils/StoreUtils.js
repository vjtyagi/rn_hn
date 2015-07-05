
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
			addEventListener: function ( event, callback ) {
				emitter.on( event, callback );
			},
			removeEventListener: function ( event, callback ) {
				emitter.removeListener( event, callback) ;
			}
		}, spec);

		return store;
	},
	createPaginatedStore: function(){
		
	}
};

module.exports  = StoreUtils;