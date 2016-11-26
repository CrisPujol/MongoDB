const express = require('express')
const MongoClient = require('mongodb').MongoClient

const url = "mongodb://localhost:27017/movies"
const PORT = 3000;

const app = express();

MongoClient.connect(url, (err, db) => {

	if (err) throw err;
	console.log("connected to DB...")

	app.get('/movies', (req, res) => {

		const limit = +req.query.size || 20;
		const page = +req.query.page || 1;
		const skip = (limit*(page-1))+1;

		// (page === 1) ==> from 1;
		// (page === 2) ==> from 21;
		// (page === 3) ==> from 41;

		db.collection("movieDetails")
			.find( { } /* , { title: 1, _id: 0 } */ )
			.sort( { title:1 } )
			.limit( limit )
			.skip( skip )
			.toArray()
			//.then( movies => movies.map( m => m.title )  )
			.then( data => res.json(data) )
			//.then( () => db.close() )
			.catch( err => console.log(err) )

	})

	// /movies/genres/Comedy?fields=title,year
	// /movies/genres/Thriller
	// /movies/genres/Action

	app.get('/movies/genres/:genre', (req, res) => {

		const limit = +req.query.size || 20;
		const page = +req.query.page || 1;
		const skip = (limit*(page-1))+1;

		const genre = req.params.genre;
		const fields = req.query.fields;
		console.log (fields)
		console.log (fields.split(','))
		const projection = fields.split(',').reduce( (oProj, field) => {
			oProj[field] = 1;
			return oProj;
		}, {})

		// { "title" : 1, "year" : 1 , "director" : 1 }"

		// (page === 1) ==> from 1;
		// (page === 2) ==> from 21;
		// (page === 3) ==> from 41;

		db.collection("movieDetails")
			.find( { genres: genre }, projection )
			.sort( { title:1 } )
			.limit( limit )
			.skip( skip )
			.toArray()
			//.then( movies => movies.map( m => m.title )  )
			.then( data => res.json(data) )
			//.then( () => db.close() )
			.catch( err => console.log(err) )

	})

	app.get('/movies/countries/:country', (req, res) => {

		const limit = +req.query.size || 20;
		const page = +req.query.page || 1;
		const skip = (limit*(page-1))+1;

		const country = req.params.country;

		// (page === 1) ==> from 1;
		// (page === 2) ==> from 21;
		// (page === 3) ==> from 41;

		db.collection("movieDetails")
			.find( { countries: country } /* , { title: 1, _id: 0 } */ )
			.sort( { title:1 } )
			.limit( limit )
			.skip( skip )
			.toArray()
			//.then( movies => movies.map( m => m.title )  )
			.then( data => res.json(data) )
			//.then( () => db.close() )
			.catch( err => console.log(err) )

	})

})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`) )  