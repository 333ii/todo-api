const MongoClient = require('mongodb').MongoClient ;

MongoClient.connect('mongodb://localhost:27017/TodoApp', 
	(err,db)=>{
		if (err) {
			return console.log('Unable to connect to MongoDB');
		}
		console.log('Connected to MongoDB');

		const myDB = db.db('TodoApp');
/*
		myDB.collection('Todos').insertOne({
			text: 'Someting to do',
			completed: false
		},(err,result)=>{

			if(err){
				console.log('Error!!' + err);
			}

			console.log(JSON.stringify(result.ops,undefined,2));

		});*/

		myDB.collection('Users').insertOne({
			name: 'Bahadir',
			age: 21,
			location: 'isparta'

		},(err,result)=>{

			if(err){
				console.log('Error!!' + err);
			}

			console.log(JSON.stringify(result.ops,undefined,2));
		})





		db.close();
	});
