const express = require('express');
const path = require('path');
const next = require('next');
const api = require("./api/api.js");

const dev = process.env.NODE_ENV !== 'production';
const app = next({dir: '.', dev});
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app.prepare().then(_ => {
	const server = express()

	// serve service worker
	server.get('/sw.js', (req, res) => res.sendFile(path.resolve('./.next/sw.js')));

	server.use('/api', api);

	server.get('/destination/:slug', (req, res) => {
  	const params = { slug: req.params.slug }
  	return app.render(req, res, '/destination', params);
	});

	server.get('/place/:slug', (req, res) => {
		const params = { slug: req.params.slug }
		return app.render(req, res, '/place', params);
	});

	server.get('/experience/:slug', (req, res) => {
  	const params = { slug: req.params.slug }
  	return app.render(req, res, '/experience', params);
	});

	server.get('/trip/:slug', (req, res) => {
  	const params = { slug: req.params.slug }
  	return app.render(req, res, '/trip', params);
	});

	server.get('*', (req, res) => {
		return app.render(req, res, '/');
	});

	server.listen(PORT, err => {
		if (err)
			throw err;

		console.log(`> App running on port ${PORT}`);
	});
});

// module.exports = auth;

// Setting up MongoDB
/*
	var mongoose = require('mongoose');
	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;
	var config = require('./config');

	mongoose.connect(config.mongoUrl);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error: '));
	db.once('open', function() {
		console.log("Connected To MongoDB");
	});

	// Setting Authentication

	var auth = express();

	// Passport config

	var User = require(./models/users);
	auth.use(passport.initialize());
	passport.use(new LocalStrategy(User.authenticate()));
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

	// Development Error Handler
	if(auth.get('env') === 'development') {
		auth.use(function(err,req,res,next) {
			res.status(err.status || 500 );
			res.json({
				message: err.message,
				error: err
			});
		});
	}

	// Production Error Handler
	app.use(function(err, req, res, next) {
	  res.status(err.status || 500 );
	  res.json({
	  	message: err.message,
	  	error: {}
	  });
	});
*/
