const express = require('express');
const path = require('path');
const next = require('next');
const cors = require('cors');
const api = require('./api/api.js');
const img = require('./api/img.js');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

console.log(PORT);

app.prepare().then((_) => {
  const server = express();

  // serve service worker
  server.get('/sw.js', (req, res) => res.sendFile(path.resolve('./.next/sw.js')));

  server.use(cors());

  server.use('/api', api);
  // server.use('/debord', img);

  server.use((err, req, res, next) => {
    console.log('error has happened something broke');
    res.status(500).send('something broke');
  });

  console.log('first');

  server.get('/destinations', (req, res) => app.render(req, res, '/destinations'));

  server.get('/trips', (req, res) => app.render(req, res, '/trips'));

  server.get('/experiences', (req, res) => app.render(req, res, '/experiences'));

  server.get('/roadtrips', (req, res) => app.render(req, res, '/roadtrips'));

  server.get('/treks', (req, res) => app.render(req, res, '/treks'));

  server.get('/destination/:slug', (req, res) => {
    const params = { slug: req.params.slug };
    return app.render(req, res, '/destination', params);
  });

  server.get('/place/:slug', (req, res) => {
    const params = { slug: req.params.slug };
    return app.render(req, res, '/place', params);
  });

  server.get('/experience/:slug', (req, res) => {
    const params = { slug: req.params.slug };
    return app.render(req, res, '/experience', params);
  });

  server.get('/trek/:slug', (req, res) => {
    const params = { slug: req.params.slug };
    return app.render(req, res, '/trek', params);
  });

  server.get('/roadtrip/:slug', (req, res) => {
    const params = { slug: req.params.slug };
    return app.render(req, res, '/roadtrip', params);
  });

  server.get('/trip/:slug', (req, res) => {
    const params = { slug: req.params.slug };
    return app.render(req, res, '/trip', params);
  });

  server.get('*', (req, res) => app.render(req, res, '/'),
    // return handle(req, res);
  );

  server.listen(PORT, (err) => {
    if (err) throw err;

    console.log(`> App running on port ${PORT}`);
  });
}).catch((err) => {
  console.log(err);
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
