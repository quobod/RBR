const  errs = require('restify-errors');
const Todos = require('../models/Todos');
const { log, table } = require('../custom_modules/log');

module.exports = server => {
	server.get('/api', async (req, res) => {
		try {
			// console.log(`\n\n\t\tUser: ${JSON.stringify(req.user)}\n\n`);
			const todos = await Todos.find({ user: req.user._id });
			if (todos) {
				res.send(todos);
			} else {
				res.send(errs.ResourceNotFoundError(err.message));
			}
		} catch (err) {
			res.send(errs.ResourceNotFoundError(err.message));
		}
	});

	server.post('/api/todos/add', async (req, res) => {
		const { user, title} = req.body;
		try {
			log(`\n\n\tUser: ${user}\n\tTitle: ${title}\n`);
			const newTodo = new Todos({
				user,
				title,
				completed: false
			});

			const todo = await newTodo.save();
			res.status(201);
			res.send({ status: 'success', payload: JSON.stringify(todo) });
		} catch(err) {
			res.send({ status: 'failure', reason: err.message });
		}
	});

	server.get('/api/todos/remove/:id', async (req, res) => {
		const todoId = req.params.id;
		try {
			await Todos.findByIdAndDelete(todoId,(err, todo) => {
				res.status(201);
				res.send({ status: 'success', payload: JSON.stringify(todo) });
			});
		} catch(err) {
			res.send({ status: 'failure', reason: err.message });
		}
	});
}