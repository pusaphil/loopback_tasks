var path = require('path');
var async = require('async');

var app = require(path.resolve(__dirname, '../server'));
var User = app.models.Owner;
var Task = app.models.Task;
var Role = app.models.Role;
var RoleMapping = app.models.RoleMapping;
var ACL = app.models.ACL;

User.create(
	[
		{email: "pusa@gmail.com", password: "qwerty"},
		{email: "aso@gmail.com", password: "qwerty"},
	],
	function(err, owners){
		if (err) throw err;

		console.log("Owners created: ",owners);

		async.parallel({
			role: 	async.apply(createRole),
			tasks: 	async.apply(createTask),
			acls: 	async.apply(createACLs),
		}, function(err, results){
			if (err) throw err;

			console.log('Done!');
			process.exit(0);
		});

		function createRole(cb){
			Role.create({
					name: 'admin'
				}, function(err, role) {
					if (err) return cb(err);
						console.log(role);

						// Make Bob an admin
						role.principals.create({
							principalType: RoleMapping.USER,
							principalId: owners[0].id
						}, function(err, principal) {
							if (err) return cb(err);
							console.log(principal);

							return cb(null, true);
					});
				});
		}

		function createTask(cb){
			Task.create(
				[
					{
						task: "Arf",
						description: "Arf arrrffff arf",
						ownerId : owners[1].id
					},
					{
						task: "Aww",
						description: "Aww aww aw",
						ownerId : owners[1].id
					}
				], function(err, task){
					if (err) return cb(err);
			
					console.log("Task created: ",task);

					return cb(null, true);
					//process.exit(0);

				}
			);
		}

		function createACLs(cb){
			ACL.create(
			[
				/*{
					"model":"Owner",
					"accessType": "*",
					"principalType": "ROLE",
					"principalId": "$everyone",
					"permission": "DENY"
				},
				{
					"model":"Owner",
					"accessType": "EXECUTE",
					"principalType": "ROLE",
					"principalId": "$unauthenticated",
					"permission": "ALLOW",
					"property": "post"
				},
				{
					"model":"Owner",
					"accessType": "EXECUTE",
					"principalType": "ROLE",
					"principalId": "$unauthenticated",
					"permission": "ALLOW",
					"property": "login"
				},
				{
					"model":"Owner",
					"accessType": "READ",
					"principalType": "ROLE",
					"principalId": "$authenticated",
					"permission": "ALLOW"
				},
				{
					"model":"Owner",
					"accessType": "WRITE",
					"principalType": "ROLE",
					"principalId": "$owner",
					"permission": "ALLOW"
				}
,*/
					{
						"model":"Task",
						"accessType": ACL.ALL,
						"principalType": ACL.ROLE,
						"principalId": Role.EVERYONE,
						"permission": ACL.DENY
					},
					{
						"model":"Task",
						"accessType": ACL.WRITE,
						"principalType": ACL.ROLE,
						"principalId": Role.AUTHENTICATED,
						"permission": ACL.ALLOW,
						"property": "create"
					},
					{
						"model":"Task",
						"accessType": ACL.WRITE,
						"principalType": ACL.ROLE,
						"principalId": Role.OWNER,
						"permission": ACL.ALLOW,
						"property": "upsert"
					},
					{
						"model":"Task",
						"accessType": ACL.READ,
						"principalType": ACL.ROLE,
						"principalId": Role.AUTHENTICATED,
						"permission": ACL.ALLOW
					}
				,/*{
					"model":"Owner",
					"principalType": "ROLE",
					"principalId": "$authenticated",
					"permission": "ALLOW",
					"property": "__create__Tasks"
				}, {
					"model":"Owner",
					"principalType": "ROLE",
					"principalId": "$authenticated",
					"permission": "ALLOW",
					"property": "__count__Tasks"
				}, {
					"model":"Owner",
					"principalType": "ROLE",
					"principalId": "$authenticated",
					"permission": "ALLOW",
					"property": "__findById__Tasks"
				}, {
					"model":"Owner",
					"principalType": "ROLE",
					"principalId": "$owner",
					"permission": "ALLOW",
					"property": "__updateById__Tasks"
				},{
					"model":"Owner",
					"principalType": "ROLE",
					"principalId": "$owner",
					"permission": "ALLOW",
					"property": "__destroyById__Tasks"
				},*/
				
			],
			function(err, acls){
				if (err) return cb(err);
				console.log(acls);

				return cb(null, true);
			});
		}
		/*owners[1].task.create({
			task: "Aw",
			description: "Aww Aww Aw"
		}, function(err, task){
			if (err) throw err;
	
			console.log("Task created: ",task);

		});*/
	}
);