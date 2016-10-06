var path = require('path');

var server = require(path.resolve(__dirname, '../server'));
var my = server.dataSources.mysql;
var mo = server.dataSources.mongo;

var lbTables = ['Owner','Task','AccessToken','ACL','RoleMapping','Role'];
my.automigrate(lbTables,function(er){
	if (er) throw er;
	console.log('Loopback tables [' + lbTables + '] created in '+my.adapter.name);
	my.disconnect();
	process.exit(0);
});