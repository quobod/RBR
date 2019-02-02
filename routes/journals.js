const  errs = require('restify-errors');
const Journal = require('../models/Journal');
const { log, table } = require('../custom_modules/log');

module.exports = server => {
		// Return user's journals
    server.get('/api/journals', async (req, res) => {
			try {
				const journals = await Journal
					.find({ user: req.user._id })
					.populate('Comment');
				if (journals) {
					res.send(journals);
				} else {
					res.send(errs.ResourceNotFoundError('You have no journals'));
				}
			} catch (err) {
				res.send(errs.ResourceNotFoundError(err.message));
			}
		});
		
		// Add new journal entry
		server.post('/api/journals/add', async (req, res) => {
			const { title, body, canComment, user } = req.body;
			log(`Title: ${title}\nBody: ${body}\nCan Comment? ${canComment}\nUser ID: ${user}`);

			try {
				const newJournal = new Journal({
					title,
					body,
					canComment,
					isPublic: false,
					showComments: false,
					user
				});
				newJournal.save((err, journal) => {
					if (err) {
						res.send({ status: 'failure', reason: err.message });
					}
					res.status(201);
					res.send({ status: 'success', payload: JSON.stringify(journal) });
				});
			}
			catch(err) {
				res.send({ status: 'failure', reason: err.message });
			}
		});

		server.get('/api/journals/remove/:id', (req, res) => {
			const { id } = req.params;
			log(`\n\n\t\tJournal ID: ${id}\n\n`);
			res.send({ status: 'success', payload: { id } });
		});
}