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
const searchKeys = require("../models/searchKeys.js");
const mustCarry = require("../models/mustcarry.js");
const nearByLoc = require("../models/nearBy.js");

const Router = express.Router();

mongoose.connect("mongodb://saulgoodman:hackerman@ds163561.mlab.com:63561/freeways-memory");

console.log("hello from api");

Router.get('/home', (req, res) => {
	console.log('hello from home');
	var obj = {};
	trips.find().select('slug title caption time_to_explore img').limit(10).exec(function(err, trips) {
		if (err) {
			console.log('error finding trips for home')
		} else {
			obj.trips = trips;

			destinations.find().select('slug title caption time_to_explore img').limit(10).exec(function(err, destinations) {
				if (err) {
					console.log('error finding destinations for home')
				} else {
					obj.destinations = destinations;

					experiences.find().select('slug title caption time_to_explore img').limit(10).exec(function(err, experiences) {
						if (err) {
							console.log('error finding experiences for home')
						} else {
							obj.experiences = experiences;
							res.send(obj);
						}
					})

				}
			})

		}
	})
});

Router.get('/places', (req, res) => {
	console.log('hello from home');
	places.find().select('slug img title caption introduction best_time_to_visit best_time_to_visit_more_information latitude longitude how_to_reach_by_bus how_to_reach_by_car how_to_reach_by_plane how_to_reach_by_train must_know how_to_reach_by_walk keywords').exec(function(err, places) {
		if (err) {
			console.log('error finding trips for home')
		} else {
			res.send(places)
		}
	})
});

Router.get('/experiences', (req, res) => {
	console.log('hello from home');
	experiences.find().select('slug img title caption information best_time_to_visit best_time_to_visit_more_information latitude longitude usual_timings days_off timing_more_information how_to_reach_by_bus how_to_reach_by_car how_to_reach_by_plane how_to_reach_by_train must_know how_to_reach_by_walk keywords').exec(function(err, experiences) {
		if (err) {
			console.log('error finding trips for home')
		} else {
			res.send(experiences)
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
	console.log("hello from trips");
	trips.findOne({
		slug: req.params.slug
	}, (err, data) => {
		if (err || data == null) {
			console.error("error looking up trip data");
		} else {
			res.send(data);
		}
	});
});

Router.get("/destination/:slug", (req, res, next) => {
	destinations.findOne({slug: req.params.slug}).lean().exec((err, data) => {
		if (err || data == null) {
			console.error("error looking up destination data ");
			next(err)
		} else {
			// rp('http://api.openweathermap.org/data/2.5/weather?lat=' + data.latitude + '&lon=' + data.longitude + '&appid=e6c33eefa2e93035fbc5bb2964d35603').then((response) => {
			// 	const weather = JSON.parse(response)
				places.find({"slug": data.places}).select('slug title name caption tags img').exec(function(err, _places) {
					if (err) {
						console.error(err);
					} else {
						experiences.find({"slug": data.experiences}).select('slug title name caption tags img').exec(function(err, _experiences) {
							if (err) {
								console.error(err);
							} else {
								mustCarry.find({"slug": data.must_carry}).select('slug title source information').exec(function(err, _must_carry) {
									if (err) {
										console.error(err);
									} else {
										const obj = {
											destination: data,
											places: _places,
											experiences: _experiences,
											// weather: Math.round(weather.main.temp - 273.15),
											weather: Math.round(290 - 273.15),
											must_carry: _must_carry
										}
										res.send(obj);
									}
								});
							}
						});
					}
				});
			// });

		}
	});
});

Router.get("/place/:slug", (req, res) => {

	places.findOne({
		slug: req.params.slug
	}, (err, data) => {
		if (err || data == null) {
			console.error("error took place while looking up places");
			next(Error("this place does not exist"));
		} else {
			let noLocationData = true
			let lat = data.latitude, lon = data.longitude
			if(typeof(let) != 'number'){
				noLocationData = false
				let = 0
				lon = 0
			}
			rp('http://api.openweathermap.org/data/2.5/weather?lat=' + data.latitude + '&lon=' + data.longitude + '&appid=e6c33eefa2e93035fbc5bb2964d35603').then((response) => {
				const weather = JSON.parse(response)

				experiences.find({"slug": data.experiences}).select('slug title name caption tags img').exec(function(err, _experiences) {
					if (err) {
						console.error(err);
					} else {
						var x = data.toObject();
						x.how_to_reach = isEmpty(x.how_to_reach_by_bus) + isEmpty(x.how_to_reach_by_car) + isEmpty(x.how_to_reach_by_airplane) + isEmpty(x.how_to_reach_by_train);
						delete x.how_to_reach_by_bus;
						delete x.how_to_reach_by_car;
						delete x.how_to_reach_by_airplane;
						delete x.how_to_reach_by_train;
						const w = (noLocationData)?Math.round(weather.main.temp - 273.15):0
						var obj = {
							place: x,
							experiences: _experiences,
							weather: w,
						}
						res.send(obj);
					}
				});
			});
			}});
	});

	Router.get("/experience/:slug", (req, res, next) => {
		experiences.findOne({
			slug: req.params.slug
		}, (err, data) => {
			if (err || data == null) {
				console.error("error took place while looking up experiences");
				next(err);
			} else {
				var x = data.toObject();
				x.how_to_reach = x.how_to_reach_by_bus + x.how_to_reach_by_car + x.how_to_reach_by_airplane + x.how_to_reach_by_train;
				delete x.how_to_reach_by_bus;
				delete x.how_to_reach_by_car;
				delete x.how_to_reach_by_airplane;
				delete x.how_to_reach_by_train;
				var obj = {
					'experiences': x
				}
				res.send(obj);
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

	Router.get('/img', (req, res) => {
		var data = 'http://res.cloudinary.com/freeways/image/list/dude.json'
		var array = [];
		rp(data).then(function(body) {
			res = JSON.parse(body);
			array = res.resources.map(function(obj) {
				console.log('http://res.cloudinary.com/freeways/image/upload/v' + obj.version + '/' + obj.public_id + '.' + obj.format);
			})
		})
	});

	Router.get('/dataimport', (req, res) => {

		console.log('hello from ImportData');
		var obj = [];

		trips.find().lean().select('slug title keywords img').exec(function(err, _trips) {
			if (err) {
				console.log('error finding trips for import')
			} else {
				var d = _trips.map(function(trip) {
					trip.type = 'trip'
					return trip
				});
				obj.push(d);
				destinations.find().lean().select('slug title keywords img').exec(function(err, _destinations) {
					if (err) {
						console.log('error finding destinations for import')
					} else {
						var c = _destinations.map(function(destination) {
							destination.type = 'destination'
							return destination
						});
						obj.push(c);

						experiences.find().lean().select('slug title keywords img').exec(function(err, _experiences) {
							if (err) {
								console.log('error finding experiences for import')
							} else {
								var a = _experiences.map(function(experience) {
									experience.type = 'experience'
									return experience
								});
								obj.push(a);

								places.find().lean().select('slug title keywords img').exec(function(err, _places) {
									if (err) {
										console.log('error finding places for import')
									} else {
										var b = _places.map(function(place) {
											place.type = 'place'
											return place
										});
										obj.push(b);

										for (var i = 0; i < obj.length; i++) {
											searchKeys.collection.insert(obj[i], function(err, data) {
												if (err) {
													console.error("Error While Adding to SearchSchema", err);
												} else {
													console.log("Succes on Adding To SearchSchema");
												}
											})
										}

										res.send('Sending Data');
									}
								})

							}
						})

					}
				})
			}
		})
	});

	Router.get('/customgeo/:lon/:lat/:distance/:limit/', (req, res) => {

		var limit = Number(req.params.limit) || 100;
		// get the max distance or set it to 8 kilometers
		var maxDistance = Number(req.params.distance) || 500;
		// we need to convert the distance to radians
		// the raduis of Earth is approximately 6371 kilometers
		maxDistance /= 6371;
		// get coordinates [ <longitude> , <latitude> ]

		var coords = [];
		coords[0] = req.params.lon || 0;
		coords[1] = req.params.lat || 0;

		nearByLoc.find({
			loc: {
				$near: coords,
				$maxDistance: maxDistance
			}
		}).limit(limit).exec(function(err, custom) {

			if (err) {
				return res.send(500, err);
			}
			res.send(200, custom);
		});
	});

	Router.get('/geosearch/:slug/:distance/:limit/', (req, res) => {

		var limit = Number(req.params.limit) || 100;
		// get the max distance or set it to 8 kilometers
		var maxDistance = Number(req.params.distance) || 500;
		// we need to convert the distance to radians
		// the raduis of Earth is approximately 6371 kilometers
		maxDistance /= 6371;
		// get coordinates [ <longitude> , <latitude> ]

		nearByLoc.findOne({slug: req.params.slug}).exec(function(err, location) {

			if (err) {
				return res.send(500, err);
			}

			var coords = [];
			coords[0] = location.loc[0] || 0;
			coords[1] = location.loc[1] || 0;

			nearByLoc.find({
				loc: {
					$near: coords,
					$maxDistance: maxDistance
				}
			}).limit(limit).exec(function(err, locations) {

				if (err) {
					return res.send(500, err);
				}
				res.send(200, locations);
			});

		});

	});

	Router.get('/geoimport', (req, res) => {

		console.log('hello from GeoImport');
		var nearby = [];

		destinations.find().lean().select('slug latitude longitude').exec(function(err, _destinations) {
			if (err) {
				console.log('error finding loc in destinations')
			} else {
				var c = _destinations.map(function(destination) {
					destination.type = 'destination'
					destination.loc = [
						Number(destination.longitude),
						Number(destination.latitude)
					]
					delete destination.longitude
					delete destination.latitude
					return destination
				});
				nearby.push(c);

				experiences.find().lean().select('slug latitude longitude').exec(function(err, _experiences) {
					if (err) {
						console.log('error finding loc in experiences')
					} else {
						var a = _experiences.map(function(experience) {
							experience.type = 'experience'
							experience.loc = [
								Number(experience.longitude),
								Number(experience.latitude)
							]
							delete experience.longitude
							delete experience.latitude
							return experience
						});
						nearby.push(a);

						places.find().lean().select('slug latitude longitude').exec(function(err, _places) {
							if (err) {
								console.log('error finding loc in places')
							} else {
								var b = _places.map(function(place) {
									place.type = 'place'
									place.loc = [
										Number(place.longitude),
										Number(place.latitude)
									]
									delete place.longitude
									delete place.latitude
									return place
								});
								nearby.push(b);

								for (var i = 0; i < nearby.length; i++) {
									nearByLoc.collection.insert(nearby[i], function(err, data) {
										if (err) {
											console.error("Error While Adding to NearBySchema", err);

										} else {
											console.log("Succes on Adding To NearBySchema");
											console.log(typeof data);
											console.log(data.ops[0].type);
											//console.log(data);
											// switch (data.type) {
											// 	case "experience":
											// 		console.log("in exp",data.type)
											// 		experiences.findOne({"slug":data.slug}).exec((err,edata)=>{
											// 			edata.loc=data._id
											// 			edata.save((err,updatedExp)=>{
											// 				if(err)
											// 					console.error("error took place while adding ref to experiences");
											// 				else {
											// 					console.log("updated exp",updatedExp);
											// 					}
											// 				})
											// 			})
											// 		break;
											// 	default:
											//
											// }
										}
									})
								}

								res.send('Sending Data');
							}
						})

					}
				})

			}
		})
	});

	Router.get('/search/:keywords', function(req, res) {
		var re = new RegExp('^' + req.params.keywords + '.*', 'i');
		// console.log('API[DEBUG]: ' + re);

		var query = searchKeys.find({
			$or: [
				{
					title: {
						$regex: re
					}
				}, {
					keywords: {
						$regex: re
					}
				}
			],
			type: {
				$ne: 'trip'
			}
		}, {
			score: {
				$meta: "textScore"
			}
		}).sort({
			score: {
				$meta: "textScore"
			}
		}).select('title slug img type').limit(8).exec(function(err, output) {
			if (err) {
				res.send(500, err);
				// console.log(err);
			} else {
				res.send(output);
			}
		});
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

	function isEmpty(val) {
		if (val === undefined || val == null || val.length <= 0)
			val = '';

		return val
	}

	module.exports = Router
