require('dotenv').config();
const restify = require('restify');
const sessions = require("client-sessions");
const passport = require('passport');
const mongoose = require('mongoose');
const rjwt = require('restify-jwt-community');

// Custom Modules
const { log, table } = require('./custom_modules/log');
const { cfc } = require('./custom_modules/cfc');
const { fyi, warning, error, success, failed, info } = require('./custom_modules/messagelevel');
const { PORT, MONGODB_URI, SERVER_ADDRESS, SERVER_NAME } = require('./config/index');

// Configure passport
require('./config/passport')(passport);

// Server Options
const serverOptions = {
	name: SERVER_NAME || 'My Restify Server',
	url: SERVER_ADDRESS || '223.3.3.45'
};

// Create Server
const server = restify.createServer(serverOptions);
server.pre(restify.pre.dedupeSlashes());
server.use(restify.plugins.bodyParser());
server.use(sessions({
    // cookie name dictates the key name added to the request object
    cookieName: 'session',
    // should be a large unguessable string
    secret: 'abc123yyighhcggfgucgdguhvgcydtfugjvhfguijkvhgcfgvcfg',
    // how long the session will stay valid in ms
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5
}));

// Passport Middleware
server.use(passport.initialize());
server.use(passport.session()); 

// Protect Routes
// server.use(rjwt({ secret: JWT_SECRET }).unless({ path: ['/auth'] } ));

server.listen(PORT, SERVER_ADDRESS, () => {
	mongoose.set('useCreateIndex', true);
	mongoose.set('useFindAndModify', true);
	mongoose.connect(
		MONGODB_URI,
		{ 
			useNewUrlParser: true,
			useCreateIndex: true
		})
		.then(() => log(info(`\n\n\t\t\tMongoDB connected\n\n\n\n\n\n`)))
		.catch(err => log(error(err)));
});

require('./routes/index')(server);

const db = mongoose.connection;

db.on('error', (err) => log(error(err)));

db.once('open', () => {
	require('./routes/todos')(server);
	require('./routes/users')(server);
	require('./routes/journals')(server);
	log(fyi(`${server.name} started @ ${server.url}`));
});
