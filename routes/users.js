const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = require('../config/index');
const User = require('../models/User');
const auth = require('../routes/authentication');
const { ensureGuest, ensureAuthenticated } = require('../helpers/auth');
const { log, table } = require('../custom_modules/log');

module.exports = server => {
	// User signin
	server.post('/auth/signin', async (req, res) => {
		const { usernameOrEmail, password } = req.body;
		/* console.log(`\n\tReceived login credentials: username or email: ${usernameOrEmail}\n\tpassword: ${password}\n`);
		res.send({ status: 'success', payload: 'received login credentials' }); */

		try {
			// Authenticate User
			const user = await auth.authenticate(usernameOrEmail, password);
			
			// Create JWT
			const token = jwt.sign(user.withoutPassword(), JWT_SECRET);
			
			// Respond with token
			res.send({ status: 'success', payload: JSON.stringify({ "token": token, "user": user.withoutPassword() }) });
		} catch (err) {
			res.send({ status: 'failure', reason: `Login failed\n${err}` });
		}
	});

	// User signout
	server.get('/auth/signout', (req, res, next) => {
		res.contentType = 'json';
		res.send({ isAuth: false });
		next();
	});

	// Delete user
	server.del('/auth/remove', async (req, res, next) => {
		const { usernameOrEmail, password } = req.body;

	});

	// Register user
	server.post('/auth/register', async (req, res, next) => {
		try {
			await User.findOne({ $or: [ { email: req.body.email }, { userName: req.body.uname } ]}, (err, user) => {
				const { fname, lname, uname, email, pwd, pwd2 } = req.body;

				if (err) {
					res.send({ status: 'failure', reason: err.message });
				} else if (user) {
					if (user.email === email) {
						res.send({ status: 'failure', reason: 'This email is already registered' });
					} else {
						res.send({ status: 'failure', reason: 'This username is taken' });
					}
				} else if (pwd !== pwd2) {
					res.send({ status: 'failure', reason: 'Passwords don\'t match' });
				} else {
					const newUser = new User({
						firstName: fname,
						lastName: lname,
						userName: uname,
						email: email,
						password: pwd
					});
		
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, async (err, hash) => {
							// Hash Password
							newUser.password = hash;
							
							// Save User
							try {
								await newUser.save((err, user) => {
									if(err) {
										res.send({ status: 'failure', reason: `Could not save user\n${err.message}` });
									}
									const token = jwt.sign(user.withoutPassword(), JWT_SECRET);
									res.send({ status: 'success', payload: JSON.stringify({ "token": token, "user": user.withoutPassword() }) });
								});
							} catch(err) {
								res.send({ status: 'failure', reason: `Encryption Failure\n${err}` });
							}
						});
					});
				}	
			});
		} catch(err) {
			res.send({ status: 'failure', reason: `Registration Failure\n${err}` });
		}		
	});






	// Google Authentication
	server.get('/google', passport.authenticate('google-login', { scope: [
		'profile', 
		'email'] }));

	server.get('/google/callback',
		passport.authenticate( 'google-login', {
			successRedirect: '/user/dashboard',
			failureRedirect: '/auth/login'
	}));

	// Facebook Authentication
	server.get('/facebook',
	passport.authenticate('facebook-login', { scope: [
		'email', 'public_profile', 'user_location'] }));

	server.get('/facebook/callback',
		passport.authenticate('facebook-login', { failureRedirect: '/' }),
			function(req, res) {
			// Successful authentication, redirect home.
			res.redirect('/user/dashboard');
		}
	);

	// GitHub Authentication
	server.get('/github',
	passport.authenticate('github-login', { scope: [ 'user:email', 'public', 'private' ] }));

	server.get('/github/callback',
		passport.authenticate('github-login', { failureRedirect: '/' }),
			function(req, res) {
			// Successful authentication, redirect home.
			res.redirect('/user/dashboard');
		}
	);

	// Local Authentication
	server.post('/auth/login', 
	passport.authenticate('local-login', { failureRedirect: '/signin' }),
	async (req, res, next) => {
		try {
			// Create JWT
			const token = await jwt.sign(req.user.withoutPassword(), JWT_SECRET);
			res.send({ status: 'success', payload: JSON.stringify({ "token": token, "user": req.user.withoutPassword() }) });
		} catch(err) {
			console.log(err);
			res.send({ status: 'failure', reason: `${err.message}` });
		}
	});

	server.get('/auth/logout', (req, res) => {
		req.logout();
		res.send({ status: 'success', payload: `successfully logged out` });
	});
	
}