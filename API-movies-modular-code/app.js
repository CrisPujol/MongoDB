const express = require('express')
const MongoClient = require('mongodb').MongoClient

const prepareParams = require('./middleware/prepareParams')

const getMovies = require('./handlers/getMovies')
const getMoviesByGenre = require('./handlers/getMoviesByGenre')
const getMoviesByCountry = require('./handlers/getMoviesByCountry')

const url = "mongodb://localhost:27017/movies"
const PORT = 3000;

const app = express();


MongoClient.connect(url, (err, db) => {

	if (err) throw err;
	console.log("connected to DB...")

	app.use( prepareParams )

	app.get('/movies', getMovies.bind(null, db) )
	app.get('/movies/genres/:genre', getMoviesByGenre.bind(null, db) )
	app.get('/movies/countries/:country', getMoviesByCountry.bind(null, db))

})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`) )