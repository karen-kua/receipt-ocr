//routing
app.post('/', (req, res, next)=> {
	console.log('server post username: ');
	console.log(req.body.username)
	res.end()
})
