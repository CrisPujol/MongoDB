const express = require('express')
const bodyparser = require('body-parser')
const moment = require('moment')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require("mongodb").ObjectID;
const app = express()
const PORT = 3000;


const url = "mongodb://localhost:27017/todo"


app.set('view engine', 'pug')
app.use( express.static('public') )
app.use( bodyparser.urlencoded( { extended: false } ) )


MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  console.log("connect to DB...")

	 //  app.get('/tasks', (req,res) => {
		// res.json(tasks)
	 //  })
	app.get('/', (req,res) => {
		const title = "TODO Tasks"

			db.collection("tasks")
				.find( { done: false } )
				.toArray()
				.then( pending => res.render('index', { title, pending } ) )
				.catch( err => console.log(err) )
		
	})


	app.get('/completed', (req,res) => {
		const title = "COMPLETED Tasks"

			db.collection("tasks")
				.find( { done: true } )
				.toArray()
				.then( completed => res.render('completed', { title, completed } ) )
				.catch( err => console.log(err) )
		
		})


	app.post('/task', (req,res) => {
		var newTask = req.body;
		newTask.done = false;
		newTask.time  = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")

		db.collection("tasks")
			.insert(newTask)
		res.redirect('/')

	})



	app.delete('/task/:id', (req,res) => {
		const id = req.params.id;

		db.collection("tasks")
				.remove({"_id": ObjectID(id)})
				.then(res.sendStatus(200))
		
	})


	app.put('/task/:id', (req,res) => {
        const id = req.params.id;
        const isDone = (req.body.done === "true") ? true : false;
        console.log(id)
        db.collection("tasks")
            .update( 
                { _id: ObjectID(id) },
                { 
                    $set: {
                        done: isDone,
                        completed: Date()
                    }
                }
            )
            .then(res.sendStatus(200))


	});




app.listen(PORT, () => console.log(`Listening on port ${PORT}...`) )