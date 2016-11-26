function getMoviesByGenre(db, req, res) {

	const { skip, limit, projection } = req
	const genre = req.params.genre;

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

}

module.exports = getMoviesByGenre;