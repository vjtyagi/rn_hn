var {Dispatcher} = require("flux"),
	dispatcherInstance = new Dispatcher();

function dispatchAsync(promise, types, action) {
	var {request, success, failure} = types

	action = action || {};

	dispatcherInstance.dispatch(request, action)

	promise.then(
		response => dispatcherInstance.dispatch(success, {...action, response}),
		error => dispatcherInstance.dispatch(failure, {...action, error})

	);
}

dispatcherInstance.dispatchAsync = dispatchAsync;

module.exports = dispatcherInstance;