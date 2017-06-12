const express = require('express');
const mongoose = require("mongoose");

const request = require("request");
var rp = require('request-promise');

// const seed = require("../seed.js");

const places = require("../models/places.js");
const trips = require('../models/trip.js');
const experiences = require("../models/experience.js");
const destinations = require("../models/destination.js");
const languages = require("../models/languages.js");
const mustCarry = require("../models/mustcarry.js");

const Router = express.Router();

mongoose.connect("mongodb://saulgoodman:hackerman@ds163561.mlab.com:63561/freeways-memory");

console.log("hello from api");

Router.get('/home', (req, res) => {
	console.log('hello from home');
	var obj = {};
	trips.find().select('slug title caption time_to_explore').limit(10).exec(function(err, trips) {
		if (err) {
			console.log('error finding trips for home')
		} else {
			obj.trips = trips;

			destinations.find().select('slug title caption  time_to_explore').limit(10).exec(function(err, destinations) {
				if (err) {
					console.log('error finding destinations for home')
				} else {
					obj.destinations = destinations;

					experiences.find().select('slug title caption time_to_explore').limit(10).exec(function(err, experiences) {
						if (err) {
							console.log('error finding experiences for home')
						} else {
							obj.experiences = experiences;
							console.log(obj);
							res.send(obj);
						}
					})

				}
			})

		}
	})
});

Router.get('/placesslug', (req, res) => {
	console.log('hello from home');
	var obj = {};
	places.find().select('slug title').exec(function(err, places) {
		if (err) {
			console.log('error finding trips for home')
		} else {
			res.send(places)
		}
	})
});

Router.get('/exslug', (req, res) => {
	console.log('hello from home');
	var obj = {};
	experiences.find().select('slug title').exec(function(err, experiences) {
		if (err) {
			console.log('error finding experiences for home')
		} else {
			res.send(experiences)
		}
	})
});


Router.get("/trip/:slug", (req, res) => {
	console.log("hello from ttrips");
	trips.find({
		slug: req.params.slug
	}, (err, data) => {
		if (err) {
			console.error("error looking up trip data");
		} else {
			res.send(data);
		}
	});
});

Router.get("/destination/:slug", (req, res) => {
	destinations.find({
		slug: req.params.slug
	}, (err, data) => {
		if (err) {
			console.error("error looking up destination data " + err.stack);
		} else {
			places.find({
				"slug": {
					"$in": data[0].places
				}
			}).select('slug title name caption tags img').exec(function(err, _places) {
				if(err) {
					console.error(err);
				} else {
					experiences.find({
						"slug": {
							"$in": data[0].experiences
						}
					}).select('slug title name caption tags img').exec(function(err, _experiences) {
						if(err) {
							console.error(err);
						} else {
							var obj = {
								destination : data[0],
								places: _places,
								experiences: _experiences,
							}
							res.send(obj);
						}
					});
				}
			});
		}
	});
});

Router.get("/place/:slug", (req, res) => {
	places.find({
		slug: req.params.slug
	}, (err, data) => {
		if (err) {
			console.error("error took place while looking up places");
		} else {
			res.send(data);
		}
	});
});

Router.get("/experience/:slug", (req, res) => {
	experiences.find({
		slug: req.params.slug
	}, (err, data) => {
		if (err) {
			console.error("error took place while looking up experiences");
		} else {
			res.send(data);
		}
	});
});

Router.get("/mustCarry/:slug", (req, res) => {
	mustCarry.find({
		slug: req.params.slug
	}, (err, data) => {
		if (err) {
			console.error("error took place while looking up mustCarry");
		} else {
			res.send(data);
		}
	});
});

Router.get("/languages/:slug", (req, res) => {
	languages.find({
		slug: req.params.slug
	}, (err, data) => {
		if (err) {
			console.error("error took place while looking up languages");
		} else {
			res.send(data);
		}
	});
});

Router.get('/img', (req, res)=>{
	var data  = 'http://res.cloudinary.com/freeways/image/list/dude.json'
	var array = [];
	rp(data).then(function(body) {
		res = JSON.parse(body);
		 array = res.resources.map(function(obj){
			console.log('http://res.cloudinary.com/freeways/image/upload/v' + obj.version + '/' + obj.public_id + '.' + obj.format);
		})
	})
});


Router.get("/fresh", (req, res) => {
	const url = 'http://api.cosmicjs.com/v1/freewaays'
	const url2 = 'http://api.cosmicjs.com/v1/freeways'
	console.log("fresh");
	rp(url2).then(function(body) {
		buckets = JSON.parse(body)
		data = {};
		fdata = {};
		buckets.bucket.objects.forEach(function(v) {
			data[v.type_slug] = [];
			fdata[v.type_slug] = [];
		})

		buckets.bucket.objects.forEach(function(v) {
			if (Object.keys(data).indexOf(v.type_slug) != -1) {
				data[v.type_slug].push(v)
			}
		});

		Object.keys(data).forEach(function(v) {
			data[v].forEach(function(i) {
				fdata[v].push({
					slug: i.slug,
					title: i.title,
					_id: mongoose.Types.ObjectId(i._id)
				});

				if (i.metadata !== null) {
					Object.keys(i.metadata).forEach(function(j) {
						len = fdata[v].length;
						if (typeof i.metadata[j] === 'object') {
							if ([j] == 'places') {
								Object.keys(i.metadata[j]).forEach(function(k) {
									fdata[v][len - 1][j] = [];
									fdata[v][len - 1][j].push(mongoose.Types.ObjectId(i.metadata[j][k]._id));
									//console.log(fdata[v][len-1][j]);

								});
							} else {
								fdata[v][len - 1][j] = i.metadata[j];
							}
						} else {
							fdata[v][len - 1][j] = i.metadata[j];
						}
					})
				}

			})
		})

		//console.log(fdata);
		console.log(Object.keys(fdata['languages'][0]));
		fdata["languages"].forEach(function(l) {
			if (Object.keys(l).indexOf('common_phrases') != -1)
				l["common_phrases"].forEach(function(v) {
					delete v.metafields;
					delete v.bucket;
					delete v.type_slug;
					delete v.status;
					delete v.content;
					delete v.created_at;
					delete v.created_by;
					delete v.created;
					delete v.modified_by;
					delete v.modified_at;

					Object.keys(v.metadata).forEach(function(i) {
						v[i] = v.metadata[i];
					})

					delete v.metadata;
					delete v._id;
					delete v.slug;
					delete v.language;
				})
		})

		mustCarry.collection.insert(fdata['must-carries'], function(err, data) {
			if (err) {
				console.error("error took place while adding mustCarry");
			} else {
				console.log("success while adding mustCarry");
			}
		});

		languages.collection.insert(fdata['languages'], function(err, data) {
			if (err) {
				console.error("error took place");
			} else {
				console.log("success while adding languages");
			}
		})

		for (var i = 0; i < fdata['places'].length; i++) {
			places.collection.insert(fdata['places'][i], function(err, data) {
				if (err) {
					console.error("error took place while adding places", err);
				} else {
					console.log("success while adding places");
				}
			})
		}

		for (var i = 0; i < fdata['destinations'].length; i++) {
			destinations.collection.insert(fdata['destinations'][i], function(err, data) {
				if (err) {
					console.error("error took place while adding destinations", err);
				} else {
					console.log("success while adding places");
				}
			})
		}

		trips.collection.insert(fdata['trips'], function(err, data) {
			if (err) {
				console.error("error in trips");
			} else {
				console.log("success while adding trips");
			}
		});

		for (var i = 0; i < fdata['experiences'].length; i++) {
			experiences.collection.insert(fdata['experiences'][i], function(err, data) {
				if (err) {
					console.error("error took place while adding experiences", err);
				} else {
					console.log("success while adding places");
				}
			})
		}

		res.send("fresh data has been added to the database")

	});
});

module.exports = Router
