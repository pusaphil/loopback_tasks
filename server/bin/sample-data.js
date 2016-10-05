var path = require('path');

var app = require(path.resolve(__dirname, '../server'));
var User = app.models.Owner;
var Task = app.models.Task;

User.create(
	[
		{email: "pusa@gmail.com", password: "qwerty"},
		{email: "aso@gmail.com", password: "qwerty"},
	],
	function(err, owners){
		if (err) throw err;

		console.log("Owners created: ",owners);
	
			Task.create(
				[
					{
						task: "Meow",
						description: "Meow meow meow",
						ownerId : 1
					},
					{
						task: "Aww",
						description: "Aww aww aw",
						ownerId : 2
					}
				], function(err, task){
					if (err) throw err;
			
					console.log("Task created: ",task);
					process.exit(0);

				}
			);
		/*owners[1].task.create({
			task: "Aw",
			description: "Aww Aww Aw"
		}, function(err, task){
			if (err) throw err;
	
			console.log("Task created: ",task);

		});*/
	}
);