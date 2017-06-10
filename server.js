const express = require('express');
const path = require('path');
const next = require('next');


// // Setting up MongoDB
//
// var mongoose = require('mongoose');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var config = require('./config');
//
// mongoose.connect(config.mongoUrl);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error: '));
// db.once('open', function() {
// 	console.log("Connected To MongoDB");
// });
//
// // Setting Authentication
//
// var auth = express();
//
// // Passport config
//
// var User = require(./models/users);
// auth.use(passport.initialize());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// // Development Error Handler
// if(auth.get('env') === 'development') {
// 	auth.use(function(err,req,res,next) {
// 		res.status(err.status || 500 );
// 		res.json({
// 			message: err.message,
// 			error: err
// 		});
// 	});
// }
//
// // Production Error Handler
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500 );
//   res.json({
//   	message: err.message,
//   	error: {}
//   });
// });

// routes
const routes = require('./routes/routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = routes.getRequestHandler(app);

const PORT = process.env.PORT || 3000;

app.prepare().then(_ => {
	const server = express().use(handle);

	// serve service worker
	server.get('/sw.js', (req, res) =>
		res.sendFile(path.resolve('./.next/sw.js'))
	);

	server.get('*', (req, res) => handle(req, res));

	server.listen(PORT, err => {
		if (err) throw err;

		console.log(`> App running on port ${PORT}`);
	});
});

 // module.exports = auth;
