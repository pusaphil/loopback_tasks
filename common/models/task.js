'use strict';

module.exports = function(Task) {
//Task.disableRemoteMethod('create', true);				// Removes (POST) /Tasks
//Task.disableRemoteMethod('upsert', true);				// Removes (PUT) /Tasks
Task.disableRemoteMethod('deleteById', true);			// Removes (DELETE) /Tasks/:id
Task.disableRemoteMethod("updateAll", true);				// Removes (POST) /Tasks/update
Task.disableRemoteMethod("updateAttributes", false);		// Removes (PUT) /Tasks/:id
//Task.disableRemoteMethod('createChangeStream', true);	// removes (GET|POST) /Tasks/change-stream
};
