const  errs = require('restify-errors');
const Journal = require('../models/Journal');
const { log, table } = require('../custom_modules/log');

module.exports = server => {
    server.get('/api/journals', async (req, res) => {
		try {
			const journals = await Journal.find({ user: req.user._id });
			if (journals) {
				res.send(journals);
			} else {
				res.send(errs.ResourceNotFoundError('You have no journals'));
			}
		} catch (err) {
			res.send(errs.ResourceNotFoundError(err.message));
		}
    });
}