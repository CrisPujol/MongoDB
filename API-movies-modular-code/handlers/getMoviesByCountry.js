function getMoviesByCountry(db, req, res) {

	const { skip, limit, projection } = req
	const country = req.params.country;

	db.collection("movieDetails")
		.find( { countries: country } , projection )
		.sort( { title:1 } )
		.limit( limit )
		.skip( skip )
		.toArray()
		//.then( movies => movies.map( m => m.title )  )
		.then( data => res.json(data) )
		//.then( () => db.close() )
		.catch( err => console.log(err) )

}

module.exports = getMoviesByCountry;