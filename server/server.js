const express = require('express');
const bodyParser = require('body-parser');
const _ =require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT ||  3000;



app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc)=>{
		res.send(doc);
	}, (e)=>{
		res.status(400).send(e);
	});	
});

app.get('/todos',(req,res)=>{
	Todo.find().then((todos)=>{
		res.send({todos});
	},(e)=>{
		res.status(400).send(e);
	});
});

app.get('/todos/:id',(req,res)=>{
	var id = req.params.id;

	Todo.findById(id).then((todo)=>{
		if (todo) {
			res.send(todo);
		}else{
			res.status(404).send({});
		}
		
	}).catch((e)=>{
		res.status(400).send(e);
	});
});

app.delete('/todos/:id',(req,res)=>{
	var id = req.params.id;

	Todo.findByIdAndRemove(id).then((todo)=>{
		
		if(todo){
			res.send(todo);
		}else{
			res.status(404).send({});
		}

	}).catch( (e)=>{
		res.status(400).send(e);
	})


});

app.patch('/todos/:id',(req,res)=>{

	var id = req.params.id;
	var body = _.pick(req.body , ['text','completed']);

	if(_.isBoolean(body.completed) && body.completed){

		body.completedAt= new Date().getTime();			

	}else{
		body.completed = false;
		body.completedAt = null;	
	}

	Todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((todo)=>{

			if(!todo){
				res.status(404).send();
			}

			res.send({todo});

	}).catch((e)=>{
		res.status(400).send(e);
	});	
	

});


app.post('/users',(req,res)=>{

	var user = new User({
		email:req.body.email,	
		password:req.body.password
	})

	user.save().then(()=>{
		return user.generateAuthToken();
	}).then((token)=>{
		res.header('x-auth',token).send(user);
	}).catch((err)=>{
			res.status(400).send(err);
	});

})





app.get('/users/me',authenticate,(req,res)=>{

	res.send(req.user);
});

app.post('/users/login',(req,res)=>{

	User.findByCredentials(req.body.email,req.body.password).then((user)=>{

		user.generateAuthToken().then((token)=>{
			res.header('x-auth',token).send(user);
		});
	}).catch((err)=>{
			res.status(400).send();
	});
});


app.listen(port,()=>{
	console.log('Server started on port'+ port);
});