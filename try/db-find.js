const MongoClient = require('mongodb').MongoClient ;

MongoClient.connect('mongodb://localhost:27017/TodoApp', 
	(err,db)=>{
		if (err) {
			return console.log('Unable to connect to MongoDB');
		}
		console.log('Connected to MongoDB');

		const myDB = db.db('TodoApp');

		myDB.collection('Todos').find({completed: false}).toArray().then((docs)=>{

			console.log(JSON.stringify(docs,undefined,2));

		},(err)=>{
			console.log("error! "+err);
		})





		db.close();
	});
