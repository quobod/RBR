const  errs = require('restify-errors');
const Journal = require('../models/Journal');
const { log, table } = require('../custom_modules/log');

module.exports = server => {
	// Return user's journals
    server.get('/api/journals', async (req, res) => {
			try {
				const journals = await Journal
					.find({ user: req.user._id })
					.populate('user')
					.populate('comment')
					.sort({date: 'desc'});
				if (journals) {
					// log(`${JSON.stringify(journals)}`);
					res.send(journals);
				} else {
					res.send(errs.ResourceNotFoundError('You have no journals'));
				}
			} catch (err) {
				res.send(errs.ResourceNotFoundError(err.message));
			}
		});

	server.get('/api/journals/get/:id', async (req, res) => {
		try {
			await Journal.findOne({ _id: req.params.id }, (err, journal) => {
				if (err) {
					res.send({ status: 'failure', reason: err.message });
				}
				res.send({ status: 'success', payload: JSON.stringify(journal) });
			});
		} catch(err) {
			res.send({ status: 'failure', reason: err.message });
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

	// Remove journal
	server.get('/api/journals/remove/:id', async (req, res) => {
		const { id } = req.params;
		try {
			await Journal.findByIdAndDelete(id, (err, journal) => {
				if (err) {
					res.send({ status: 'failure', reason: err.message });
				}
				res.status(201);
				res.send({ status: 'success', payload: 'done' });
			});
		} catch(err) {
			res.send({ status: 'failure', reason: err.message });
		}
	});

	// Edit journal

	// Comment journal

	// Remove comment
}