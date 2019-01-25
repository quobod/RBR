module.exports = server => {
	server.get('/', (req, res, next) => {
		res.contentType = 'json';
		res.send({ msg: 'Been there, done that ... got the T-shirt' });
		next();
	});
}