const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require("mongodb").ObjectID;

const url = "mongodb://localhost:27017/test"
const PORT = 3000;

const app = express();

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  console.log("connect to DB...")

  		// ALL RESTAURANTS
  		app.get('/restaurants', (req, res) => {

		const limit = +req.query.limit || 20;
		const page = +req.query.page || 1;
		const skip = (limit*(page-1))+1;

		const show = req.query.show;
		const hide = req.query.hide;

		if(show || hide){
			const projection= {}
			if(show){
				show.split(",").forEach( elem => {
					projection[elem]=1
				})
			}

			if(hide){
				hide.split(",").forEach( elem => {
					projection[elem]=0
			})
			}	
			req.projection = projection
		}

		

		db.collection("restaurants")
			.find( {}, req.projection )
			.sort( { title:1 } )
			.limit( limit )
			.skip( skip )
			.toArray()
			//.then( movies => movies.map( m => m.title )  )
			.then( data => res.json(data) )
			//.then( () => db.close() )
			.catch( err => console.log(err) )

		})


		app.get('/restaurants/borough/:borough', (req, res) => {

		const limit = +req.query.limit || 20;
		const page = +req.query.page || 1;
		const skip = (limit*(page-1))+1;

		const borough = req.params.borough;

		const show = req.query.show;
		const hide = req.query.hide;

		if(show || hide){
			const projection= {}
			if(show){
				show.split(",").forEach( elem => {
					projection[elem]=1
				})
			}

			if(hide){
				hide.split(",").forEach( elem => {
					projection[elem]=0
			})
			}	
			req.projection = projection
		}

		db.collection("restaurants")
			.find( { "borough": borough },  req.projection )
			.sort( { title:1 } )
			.limit( limit )
			.skip( skip )
			.toArray()
			//.then( movies => movies.map( m => m.title )  )
			.then( data => res.json(data) )
			//.then( () => db.close() )
			.catch( err => console.log(err) )

	})

		app.get('/restaurants/cuisine/:cuisine', (req, res) => {

		const limit = +req.query.limit || 20;
		const page = +req.query.page || 1;
		const skip = (limit*(page-1))+1;

		const cuisine = req.params.cuisine;

		const show = req.query.show;
		const hide = req.query.hide;

		if(show || hide){
			const projection= {}
			if(show){
				show.split(",").forEach( elem => {
					projection[elem]=1
				})
			}

			if(hide){
				hide.split(",").forEach( elem => {
					projection[elem]=0
			})
			}	
			req.projection = projection
		}

		db.collection("restaurants")
			.find( { "cuisine": cuisine }, req.projection )
			.sort( { title:1 } )
			.limit( limit )
			.skip( skip )
			.toArray()
			//.then( movies => movies.map( m => m.title )  )
			.then( data => res.json(data) )
			//.then( () => db.close() )
			.catch( err => console.log(err) )

	})

		app.get('/restaurants/cuisine/not/:cuisine', (req, res) => {

		const limit = +req.query.limit || 20;
		const page = +req.query.page || 1;
		const skip = (limit*(page-1))+1;

		const cuisine = req.params.cuisine;

		const show = req.query.show;
		const hide = req.query.hide;

		if(show || hide){
			const projection= {}
			if(show){
				show.split(",").forEach( elem => {
					projection[elem]=1
				})
			}

			if(hide){
				hide.split(",").forEach( elem => {
					projection[elem]=0
			})
			}	
			req.projection = projection
		}

		db.collection("restaurants")
			.find( { "cuisine": { $nin: [cuisine] } }, req.projection )
			.sort( { title:1 } )
			.limit( limit )
			.skip( skip )
			.toArray()
			//.then( movies => movies.map( m => m.title )  )
			.then( data => res.json(data) )
			//.then( () => db.close() )
			.catch( err => console.log(err) )

	})




	app.get('/restaurants/:id', (req, res) => {

		const limit = +req.query.limit || 20;
		const page = +req.query.page || 1;
		const skip = (limit*(page-1))+1;

		const id = req.params.id;

		const show = req.query.show;
		const hide = req.query.hide;

		if(show || hide){
			const projection= {}
			if(show){
				show.split(",").forEach( elem => {
					projection[elem]=1
				})
			}

			if(hide){
				hide.split(",").forEach( elem => {
					projection[elem]=0
			})
			}	
			req.projection = projection
		}

		db.collection("restaurants")
			.find( { "_id": ObjectID(id) }, req.projection)
			.toArray()
			//.then( movies => movies.map( m => m.title )  )
			.then( data => res.json(data) )
			//.then( () => db.close() )
			.catch( err => console.log(err) )

	})
  		
});
















app.listen(PORT, () => console.log(`Listening on port ${PORT}...`) )  