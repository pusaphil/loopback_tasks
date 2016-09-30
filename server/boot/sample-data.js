module.exports = function(app){
	var Owner = app.models.Owner;
	var Task = app.models.Task;

	Owner.create(
		[	
			{username: 'Pusa', email: 'pusa@foo.com', password: 'qwerty'},
			{username: 'Aso', email: 'aso@foo.com', password: 'qwerty'}
		],
		function(err, owners){
			if (err) throw err;

			console.log('Owners created: ',owners);
		
			Task.create({
				task: 'Meow',
				description: 'Meow meow meow',
				ownerId : 1
			}, function(err, task){
				if (err) throw err;
		
				console.log('Task created: ',task);

			});

			Task.create({
				task: 'Aww',
				description: 'Aww aww aw',
				ownerId : 2
			}, function(err, task){
				if (err) throw err;
		
				console.log('Task created: ',task);

			});
/*
			owners[1].tasks.create({
				task: 'Aw',
				description: 'Aww Aww Aw'
			}, function(err, task){
				if (err) throw err;
		
				console.log('Task created: ',task);

			});*/
		}
	);
};