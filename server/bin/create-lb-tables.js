var path = require('path');

var server = require(path.resolve(__dirname, '../server'));
var ds = server.dataSources.mysql;
var lbTables = ['Owner','Task','AccessToken','ACL','RoleMapping','Role'];
ds.automigrate(lbTables,function(er){
	if (er) throw er;
	console.log('Loopback tables [' + lbTables + '] created in '+ds.adapter.name);
	ds.disconnect();
});