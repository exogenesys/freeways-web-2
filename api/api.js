const express = require('express');
const mongoose = require('mongoose');

const request = require('request');
const rp = require('request-promise');
const backup = require('mongodb-backup');
// const seed = require("../seed.js");

const places = require('../models/places.js');
const trips = require('../models/trip.js');
const treks = require('../models/trek.js');
const roadtrips = require('../models/roadtrip.js');
const experiences = require('../models/experience.js');
const destinations = require('../models/destination.js');
const languages = require('../models/languages.js');
const searchKeys = require('../models/searchkeys.js');
const mustCarry = require('../models/mustcarry.js');
const nearByLoc = require('../models/nearBy.js');

const Router = express.Router();
const uri = 'mongodb://saulgoodman:hackerman@ds163561.mlab.com:63561/freeways-memory';

mongoose.connect(uri);

console.log('hello from api');

// Router.get('/deleteAllPlacesExceptJaiBhai', (req, res) => {
// 	let x = []
// 	destinations.find({
// 		'slug': {
// 			$in: [
// 				'shimla', 'ladakh', 'jaipur', 'andaman-and-nicobar-islands'
// 				// 'manali',
// 				// 'coorg',
// 				// 'dharamshala',
// 				// 'ooty',
// 				// 'Kasol',
// 				// 'agra',
// 				// 'dehradun',
// 				// 'goa',
// 				// 'jaisalmer'
// 			]
// 		}
// 	}).select('places slug').exec((err, _destinations) => {
// 		for (var i = 0; i < _destinations.length; i++) {
// 			for (var j = 0; j < _destinations[i].places.length; j++) {
// 				x.push(_destinations[i].places[j])
// 			}
// 		}
// 		places.remove({
// 			slug: {
// 				$nin: x
// 			}
// 		}).exec((err, docs) => {
// 			if (err)
// 				res.send(err);
// 			else
// 				res.send({'Papu': docs})
// 		})
// 	});
// });
//
// Router.get('/AddVarinderPrahDaData', (req, res) => {
// 	// let count = 0
// 	// let d = []
// 	// for (var i = 0; i < y.length; i++) {
// 	// 	for (var j = 0; j < y.length; j++) {
// 	// 		if(y[i].slug == y[j].slug && i != j){
// 	// 			d.push(y[i].slug)
// 	// 		}
// 	// 	}
// 	// }
// 	// res.send({'count':count, 'i':i, 'j':j, 'd':d});
// 	places.insertMany(y, (err) => {
// 		if (err)
// 			res.send(err)
// 		else
// 			res.send('God is dead.')
// 	});
// });
//
// Router.get('/fetchSlugsOfPlacesByDestination', (req, res) => {
// 	places.find({
// 		'destination': {
// 			$in: [
// 				'Agra', 'Ooty', 'Jaisalmer', 'Manali'
// 				// 'manali',
// 				// 'coorg',
// 				// 'dharamshala',
// 				// 'ooty',
// 				// 'Kasol',
// 				// 'agra',
// 				// 'dehradun',
// 				// 'goa',
// 				// 'jaisalmer'
// 			]
// 		}
// 	}).select('slug destination').exec((err, _places) => {
// 		var agra = [];
// 		var ooty = [];
// 		var jaisalmer = [];
// 		var manali = [];
//
// 		for (var i = 0; i < _places.length; i++) {
// 			if (_places[i].destination == 'Agra') {
// 				agra.push(_places[i].slug)
// 			}
//
// 			if (_places[i].destination == 'Ooty') {
// 				ooty.push(_places[i].slug)
// 			}
//
// 			if (_places[i].destination == 'Jaisalmer') {
// 				jaisalmer.push(_places[i].slug)
// 			}
//
// 			if (_places[i].destination == 'Manali') {
// 				manali.push(_places[i].slug)
// 			}
// 		}
//
// 		destinations.update({
// 			'slug': 'jaisalmer'
// 		}, {
// 			places: jaisalmer
// 		}, function(err, number, rawRes) {
// 			destinations.update({
// 				'slug': 'ooty'
// 			}, {
// 				places: ooty
// 			}, function(err1, number1, rawRes1) {
// 				destinations.update({
// 					'slug': 'manali'
// 				}, {
// 					places: manali
// 				}, function(err1, number2, rawRes3) {
// 					destinations.update({
// 						'slug': 'agra'
// 					}, {
// 						places: agra
// 					}, function(err1, number3, rawRes3) {
// 						if (err || err1) {
// 							res.send({'err': err, 'err1': err1});
// 						} else {
// 							res.send({'1': number, '2': number1, '3': number, '4': number1});
// 						}
// 					})
// 				})
// 			})
// 		})
//
// 	});
// });
//
// Router.get('/fetchSlugsOfExByDestination', (req, res) => {
// 	experiences.find({
// 		'destination': {
// 			$in: [
// 				'Agra', 'Ooty', 'Jaisalmer', 'Manali'
// 				// 'manali',
// 				// 'coorg',
// 				// 'dharamshala',
// 				// 'ooty',
// 				// 'Kasol',
// 				// 'agra',
// 				// 'dehradun',
// 				// 'goa',
// 				// 'jaisalmer'
// 			]
// 		}
// 	}).select('slug destination').exec((err, _experiences) => {
// 		var agra = [];
// 		var ooty = [];
// 		var jaisalmer = [];
// 		var manali = [];
//
// 		for (var i = 0; i < _experiences.length; i++) {
// 			if (_experiences[i].destination == 'Agra') {
// 				agra.push(_experiences[i].slug)
// 			}
//
// 			if (_experiences[i].destination == 'Ooty') {
// 				ooty.push(_experiences[i].slug)
// 			}
//
// 			if (_experiences[i].destination == 'Jaisalmer') {
// 				jaisalmer.push(_experiences[i].slug)
// 			}
//
// 			if (_experiences[i].destination == 'Manali') {
// 				manali.push(_experiences[i].slug)
// 			}
// 		}
//
// 		destinations.update({
// 			'slug': 'jaisalmer'
// 		}, {
// 			experiences: jaisalmer
// 		}, function(err, number, rawRes) {
// 			destinations.update({
// 				'slug': 'ooty'
// 			}, {
// 				experiences: ooty
// 			}, function(err1, number1, rawRes1) {
// 				destinations.update({
// 					'slug': 'manali'
// 				}, {
// 					experiences: manali
// 				}, function(err2, number2, rawRes2) {
// 					destinations.update({
// 						'slug': 'agra'
// 					}, {
// 						experiences: agra
// 					}, function(err3, number3, rawRes3) {
// 						if (err || err1) {
// 							res.send({'err': err, 'err1': err1});
// 						} else {
// 							res.send({'1': number, '2': number1, '3': number, '4': number1});
// 						}
// 					})
// 				})
// 			})
// 		})
//
// 	});
// });

// Router.get('/crawlHDFY', (req, res) => {
// 	var counter = 0;
// 	console.log('go');
// 	setInterval(function() {
// 		console.log("Starting again bruh");
// 		var promises = [];
// 		if (counter < 2) {
// 			for (var i = 7001 ; i < 7053; i++) {
// 				console.log("fetching ", i , "th object");
// 				var promise = rp('https://www.holidify.com/rest/utility/getAllSearchResults.hdfy?query=Attraction' + i).then((body) => {
// 					var a = JSON.parse(body)
// 					return a.autocompleteList[0];
// 				}).catch((err) => {
// 					console.log(err);
// 				});
// 				promises.push(promise)
// 			}
// 			counter++;
//
// 				Promise.all(promises).then((results) => {
// 					fs.appendFile('holidify_nu11ed.txt', JSON.stringify(results), function(err) {
// 						if (err) {
// 							console.log('Whoops!');
// 							res.send(err)
// 						} else {
// 							console.log('Saved!');
// 						}
// 					});
// 				})
// 		} else {
// 			res.send('done man')
// 		}
// 	}, 1000 * 5);
//
// });

Router.get('/ImgUrlGen', (req, res) => {
  experiences.find().select('slug').exec((err, _experiences) => {
    const x = [];
    for (let i = 0; i < _experiences.length; i++) {
      experiences.update({
        slug: _experiences[i].slug,
      }, {
        // img: 'https://s3.amazonaws.com/society-of-the-spectacle/img/' + _experiences[i].slug + '.jpg',
        img_thumb: `https://s3.amazonaws.com/society-of-the-spectacle/img/thumbs/${_experiences[i].slug}.jpg`,
      }, (err, number, rawRes) => {
        x.push(number);
      });
    }
  });
});

Router.get('/home', (req, res) => {
  const obj = {};
  trips.find().select('slug title caption time_to_explore img').limit(10).exec((err, trips) => {
    if (err) {
      console.log('error finding trips for home');
    } else {
      obj.trips = trips;

      destinations.find({
        visible: {
          $ne: false,
        },
      }).select('slug title caption time_to_explore img_thumb').limit(10).exec((err, destinations) => {
        if (err) {
          console.log('error finding destinations for home');
        } else {
          obj.destinations = destinations;
          experiences.find({
            slug: {
              $in: [
                'biking-alongside-pangong-tso',
                'buy-the-extremely-famous-ladakhi-pashmina',
                'visit-the-serene-hatu-peak',
                'skiing-at-kufri',
                'beach-bumming',
                'try-the-glass-bottom-boat-ride',
                'canyoning-in-vashisht',
                'rock-climbing-rangri-vashisht',
                'hot-air-balloon-ride-jaipur',
                'yoga-at-nature-cure-ooty',
              ],
            },
          }).select('slug title caption time_to_explore img_thumb').limit(10).exec((err, experiences) => {
            if (err) {
              console.log('error finding experiences for home');
            } else {
              obj.experiences = experiences;
              places.find({
                slug: {
                  $in: [
                    'leh',
                    'pangong-tsol',
                    'agra-fort',
                    'sadar-bazaar',
                    'kargil',
                    'city-palace',
                    'cellular-jail',
                    'old-manali',
                    'neil-island',
                    'gadisar-lake',
                  ],
                },
              }).select('slug title caption time_to_explore img_thumb').limit(10).exec((err, places) => {
                if (err) {
                  console.log('error finding experiences for home');
                } else {
                  obj.places = places;
                  res.send(obj);
                }
              });
            }
          });
        }
      });
    }
  });
});

Router.get('/places', (req, res) => {
  places.find().select('slug img title caption introduction best_time_to_visit best_time_to_visit_more_information latitude longitude how_to_reach_by_bus how_to_reach_by_car how_to_reach_by_plane how_to_reach_by_train must_know how_to_reach_by_walk keywords').exec((err, places) => {
    if (err) {
      console.log('error finding trips for home');
    } else {
      res.send(places);
    }
  });
});

Router.get('/destinations', (req, res) => {
  destinations.find({
    visible: {
      $ne: false,
    },
  }).select('slug img_thumb title type best_month_to_visit latitude longitude id filter solo_score family_score friends_score couple_score score zone recommended_for visible').exec((err, destinations) => {
    if (err) {
      console.log('error finding trips for home');
    } else {
      res.send(destinations);
    }
  });
});


Router.get('/experiences', (req, res) => {
  experiences.find().select('slug img_thumb caption title type best_time_to_visit best_month_to_visit latitude longitude filter zone').exec((err, experiences) => {
    if (err) {
      console.log('error finding trips for home');
    } else {
      res.send(experiences);
    }
  });
});


Router.get('/trips', (req, res) => {
  trips.find().select('id slug name caption img_thumb type best_time_to_visit best_month_to_visit latitude longitude filter zone destinations')
    .exec((err, trips) => {
      if (err) {
        console.log('error finding trips for home', err);
      } else {
        res.send(trips);
      }
    });
});

Router.get('/roadtrips', (req, res) => {
  roadtrips.find().select('id slug name caption img_thumb type best_time_to_visit filter zone items_covered')
    .exec((err, trips) => {
      if (err) {
        console.log('error finding trips for home', err);
      } else {
        res.send(trips);
      }
    });
});


Router.get('/treks', (req, res) => {
  treks.find().select('id slug name img_thumb caption difficulty duration max_altitude region base_camp_lat base_camp_lng base_camp_name summit_lat summit_lng summit_name dist_from_nearest_major_city no_of_days_trekking best_time_to_visit best_time_to_visit_more_informartion trek_distance budget for_whom highlights')
    .exec((err, treks) => {
      if (err) {
        console.log('error finding treks for home', err);
      } else {
        res.send(treks);
      }
    });
});


Router.get('/placesslug', (req, res) => {
  const obj = {};
  places.find().select('slug title').exec((err, places) => {
    if (err) {
      console.log('error finding trips for home');
    } else {
      res.send(places);
    }
  });
});

Router.get('/exslug', (req, res) => {
  const obj = {};
  experiences.find().select('slug title').exec((err, experiences) => {
    if (err) {
      console.log('error finding experiences for home');
    } else {
      res.send(experiences);
    }
  });
});

Router.get('/trip/:slug', (req, res) => {
  console.log('hello from trips');
  trips.findOne({
    slug: req.params.slug,
  }, (err, data) => {
    if (err || data == null) {
      console.error('error looking up trip data');
    } else {
      places.find({ id: { $in: data.places } }).select('slug title name img_thumb latitude longitude').exec((err, _places) => {
        if (err) {
          console.error(err);
        } else {
          experiences.find({ id: { $in: data.experiences } }).select('slug title name caption img_thumb latitude longitude').exec((err, _experiences) => {
            if (err) {
              console.error(err);
            } else {
              mustCarry.find({ id: { $in: data.must_carry } }).select('slug title source information').exec((err, _must_carry) => {
                if (err) {
                  console.error(err);
                } else {
                  destinations.find({ id: { $in: data.destinations } }).select('slug title name caption img_thumb latitude longitude').exec((err, _destinations) => {
                    if (err) {
                      console.error(err);
                    } else {
                      const obj = {
                        trip: data,
                        places: _places,
                        experiences: _experiences,
                        must_carry: _must_carry,
                        destinations: _destinations,
                      };
                      res.send(obj);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

Router.get('/roadtrip/:slug', (req, res) => {
  console.log('hello from trips');
  roadtrips.findOne({
    slug: req.params.slug,
  }, (err, data) => {
    if (err || data == null) {
      console.error('error looking up trip data');
    } else {
      res.send(data);
    }
  });
});


Router.get('/destination/:slug', (req, res, next) => {
  destinations.findOne({ slug: req.params.slug }).lean().exec((err, data) => {
    if (err || data == null) {
      console.error('error looking up destination data ');
      // next(err)
    } else {
      // rp('http://api.openweathermap.org/data/2.5/weather?lat=' + data.latitude + '&lon=' + data.longitude + '&appid=e6c33eefa2e93035fbc5bb2964d35603').then((response) => {
      // 	const weather = JSON.parse(response)
      places.find({ id: { $in: data.places } }).select('slug title name caption tags img_thumb latitude longitude').exec((err, _places) => {
        if (err) {
          console.error(err);
        } else {
          experiences.find({ id: { $in: data.experiences } }).select('slug title name caption tags img_thumb latitude longitude').exec((err, _experiences) => {
            if (err) {
              console.error(err);
            } else {
              mustCarry.find({ id: { $in: data.must_carry } }).select('slug title source information').exec((err, _must_carry) => {
                if (err) {
                  console.error(err);
                } else {
                  const obj = {
                    destination: data,
                    places: _places,
                    experiences: _experiences,
                    weather: '23',
                    must_carry: _must_carry,
                  };
                  res.send(obj);
                }
              });
            }
          });
        }
      });
    }
  });
});

Router.get('/place/:slug', (req, res) => {
  places.findOne({
    slug: req.params.slug,
  }, (err, data) => {
    if (err || data == null) {
      console.error('error took place while looking up places');
      // next(Error("this place does not exist"));
    } else {
      let noLocationData = true;
      let lat = 0;
      let lon = 0;
      if (data.latitude && data.longitude) {
        noLocationData = !noLocationData;
        lat = Number(data.latitude);
        lon = Number(data.longitude);
      }
      console.log('lat', data.latitude);
      console.log('lon', data.longitude);
      // rp('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=e6c33eefa2e93035fbc5bb2964d35603').then((response) => {
      // 	const weather = JSON.parse(response)

      experiences.find({ id: { $in: data.experiences } }).select('slug title name caption tags img img_thumb').exec((err, _experiences) => {
        if (err) {
          console.error(err);
        } else {
          mustCarry.find({ id: { $in: data.must_carry } }).select('slug title source information').exec((err, _must_carry) => {
            if (err) {
              console.error(err);
            } else {
              const x = data.toObject();
              x.how_to_reach = isEmpty(x.how_to_reach_by_bus) + isEmpty(x.how_to_reach_by_car) + isEmpty(x.how_to_reach_by_airplane) + isEmpty(x.how_to_reach_by_train);
              delete x.how_to_reach_by_bus;
              delete x.how_to_reach_by_car;
              delete x.how_to_reach_by_airplane;
              delete x.how_to_reach_by_train;
              // const w = (noLocationData)?Math.round(weather.main.temp - 273.15):0
              const w = 23;
              const obj = {
                place: x,
                experiences: _experiences,
                must_carry: _must_carry,
                weather: w,
              };
              res.send(obj);
            }
          });
        }
      });
    }
  });
});

Router.get('/experience/:slug', (req, res, next) => {
  experiences.findOne({
    slug: req.params.slug,
  }).exec((err, data) => {
    if (err || data == null) {
      console.error('error took place while looking up experiences');
      // next(err);
    } else {
      mustCarry.find({ id: { $in: data.must_carry } }).select('slug title source information').exec((err, _must_carry) => {
        if (err) {
          console.error(err);
        } else {
          const x = data.toObject();
          x.how_to_reach = isEmpty(x.how_to_reach_by_bus) + isEmpty(x.how_to_reach_by_car) + isEmpty(x.how_to_reach_by_airplane) + isEmpty(x.how_to_reach_by_train) + isEmpty(x.how_to_reach);
          delete x.how_to_reach_by_bus;
          delete x.how_to_reach_by_car;
          delete x.how_to_reach_by_airplane;
          delete x.how_to_reach_by_train;
          // const w = (noLocationData)?Math.round(weather.main.temp - 273.15):0
          const w = 23;
          const obj = {
            experiences: data,
            must_carry: _must_carry,
          };
          res.send(obj);
        }
      });
    }
  });
});

Router.get('/trek/:slug', (req, res, next) => {
  treks.findOne({
    slug: req.params.slug,
  }, (err, data) => {
    if (err || data == null) {
      console.error('error took place while looking up experiences');
      // next(err);
    } else {
      mustCarry.find({ id: { $in: data.must_carry } }).select('slug title source information').exec((err, _must_carry) => {
        if (err) {
          console.error(err);
        } else {
          const x = data.toObject();
          const obj = {
            experiences: data,
            must_carry: _must_carry,
          };
          res.send(obj);
        }
      });
    }
  });
});

Router.get('/mustCarry/:slug', (req, res) => {
  mustCarry.find({
    slug: req.params.slug,
  }, (err, data) => {
    if (err) {
      console.error('error took place while looking up mustCarry');
    } else {
      res.send(data);
    }
  });
});

Router.get('/languages/:slug', (req, res) => {
  languages.find({
    slug: req.params.slug,
  }, (err, data) => {
    if (err) {
      console.error('error took place while looking up languages');
    } else {
      res.send(data);
    }
  });
});

Router.get('/img', (req, res) => {
  const data = 'http://res.cloudinary.com/freeways/image/list/dude.json';
  let array = [];
  rp(data).then((body) => {
    res = JSON.parse(body);
    array = res.resources.map((obj) => {
      console.log(`http://res.cloudinary.com/freeways/image/upload/v${obj.version}/${obj.public_id}.${obj.format}`);
    });
  });
});

Router.get('/dataimport', (req, res) => {
  console.log('hello from ImportData');
  const obj = [];

  trips.find().lean().select('slug title keywords img').exec((err, _trips) => {
    if (err) {
      console.log('error finding trips for import');
    } else {
      const d = _trips.map((trip) => {
        trip.type = 'trip';
        return trip;
      });
      obj.push(d);
      destinations.find().lean().select('slug title keywords img').exec((err, _destinations) => {
        if (err) {
          console.log('error finding destinations for import');
        } else {
          const c = _destinations.map((destination) => {
            destination.type = 'destination';
            return destination;
          });
          obj.push(c);

          experiences.find().lean().select('slug title keywords img').exec((err, _experiences) => {
            if (err) {
              console.log('error finding experiences for import');
            } else {
              const a = _experiences.map((experience) => {
                experience.type = 'experience';
                return experience;
              });
              obj.push(a);

              places.find().lean().select('slug title keywords img').exec((err, _places) => {
                if (err) {
                  console.log('error finding places for import');
                } else {
                  const b = _places.map((place) => {
                    place.type = 'place';
                    return place;
                  });
                  obj.push(b);

                  for (let i = 0; i < obj.length; i++) {
                    searchKeys.collection.insert(obj[i], (err, data) => {
                      if (err) {
                        console.error('Error While Adding to SearchSchema', err);
                      } else {
                        console.log('Succes on Adding To SearchSchema');
                      }
                    });
                  }

                  res.send('Sending Data');
                }
              });
            }
          });
        }
      });
    }
  });
});

Router.get('/customgeo/:lon/:lat/:distance/:limit/', (req, res) => {
  const limit = Number(req.params.limit) || 100;
  // get the max distance or set it to 8 kilometers
  let maxDistance = Number(req.params.distance) || 500;
  // we need to convert the distance to radians
  // the raduis of Earth is approximately 6371 kilometers
  maxDistance /= 6371;
  // get coordinates [ <longitude> , <latitude> ]

  const coords = [];
  coords[0] = req.params.lon || 0;
  coords[1] = req.params.lat || 0;

  nearByLoc.find({
    loc: {
      $near: coords,
      $maxDistance: maxDistance,
    },
  }).limit(limit).exec((err, custom) => {
    if (err) {
      return res.send(500, err);
    }
    res.send(200, custom);
  });
});

Router.get('/geosearch/:slug/:distance/:limit/', (req, res) => {
  const limit = Number(req.params.limit) || 100;
  // get the max distance or set it to 8 kilometers
  let maxDistance = Number(req.params.distance) || 500;
  // we need to convert the distance to radians
  // the raduis of Earth is approximately 6371 kilometers
  maxDistance /= 6371;
  // get coordinates [ <longitude> , <latitude> ]

  nearByLoc.findOne({ slug: req.params.slug }).exec((err, location) => {
    if (err) {
      return res.send(500, err);
    }

    const coords = [];
    coords[0] = location.loc[0] || 0;
    coords[1] = location.loc[1] || 0;

    nearByLoc.find({
      loc: {
        $near: coords,
        $maxDistance: maxDistance,
      },
    }).limit(limit).exec((err, locations) => {
      if (err) {
        return res.send(500, err);
      }
      res.send(200, locations);
    });
  });
});

Router.get('/geoimport', (req, res) => {
  console.log('hello from GeoImport');
  const nearby = [];

  destinations.find().lean().select('slug latitude longitude').exec((err, _destinations) => {
    if (err) {
      console.log('error finding loc in destinations');
    } else {
      const c = _destinations.map((destination) => {
        destination.type = 'destination';
        destination.loc = [
          Number(destination.longitude),
          Number(destination.latitude),
        ];
        delete destination.longitude;
        delete destination.latitude;
        return destination;
      });
      nearby.push(c);

      experiences.find().lean().select('slug latitude longitude').exec((err, _experiences) => {
        if (err) {
          console.log('error finding loc in experiences');
        } else {
          const a = _experiences.map((experience) => {
            experience.type = 'experience';
            experience.loc = [
              Number(experience.longitude),
              Number(experience.latitude),
            ];
            delete experience.longitude;
            delete experience.latitude;
            return experience;
          });
          nearby.push(a);

          places.find().lean().select('slug latitude longitude').exec((err, _places) => {
            if (err) {
              console.log('error finding loc in places');
            } else {
              const b = _places.map((place) => {
                place.type = 'place';
                place.loc = [
                  Number(place.longitude),
                  Number(place.latitude),
                ];
                delete place.longitude;
                delete place.latitude;
                return place;
              });
              nearby.push(b);

              for (let i = 0; i < nearby.length; i++) {
                nearByLoc.collection.insert(nearby[i], (err, data) => {
                  if (err) {
                    console.error('Error While Adding to NearBySchema', err);
                  } else {
                    console.log('Succes on Adding To NearBySchema');
                    console.log(typeof data);
                    console.log(data.ops[0].type);
                    // console.log(data);
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
                });
              }

              res.send('Sending Data');
            }
          });
        }
      });
    }
  });
});

Router.get('/search/:keywords', (req, res) => {
  const re = new RegExp(`^${req.params.keywords}.*`, 'i');
  // console.log('API[DEBUG]: ' + re);

  const query = searchKeys.find({
    $or: [
      {
        title: {
          $regex: re,
        },
      }, {
        keywords: {
          $regex: re,
        },
      },
    ],
    type: {
      $ne: 'trip',
    },
  }, {
    score: {
      $meta: 'textScore',
    },
  }).sort({
    score: {
      $meta: 'textScore',
    },
  }).select('title slug img type').limit(8)
    .exec((err, output) => {
      if (err) {
        res.send(500, err);
        // console.log(err);
      } else {
        res.send(output);
      }
    });
});

Router.get('/backup', (req, res) => {
  backup({
    uri,
    root: __dirname,
    callback(err) {
      if (err) {
        return res.send(err);
      }
      return res.send('Red: Hope is a dangerous thing my friend, it can kill a man... \n Andy Dufresne: hope is a good thing maybe even the best of things and good things never die');
    },
  });
});

Router.get('/fresh', (req, res) => {
  const url = 'http://api.cosmicjs.com/v1/freewaays';
  const url2 = 'http://api.cosmicjs.com/v1/freeways';
  console.log('fresh');
  rp(url2).then((body) => {
    buckets = JSON.parse(body);
    data = {};
    fdata = {};
    buckets.bucket.objects.forEach((v) => {
      data[v.type_slug] = [];
      fdata[v.type_slug] = [];
    });

    buckets.bucket.objects.forEach((v) => {
      if (Object.keys(data).indexOf(v.type_slug) != -1) {
        data[v.type_slug].push(v);
      }
    });

    Object.keys(data).forEach((v) => {
      data[v].forEach((i) => {
        fdata[v].push({
          slug: i.slug,
          title: i.title,
          _id: mongoose.Types.ObjectId(i._id),
        });

        if (i.metadata !== null) {
          Object.keys(i.metadata).forEach((j) => {
            len = fdata[v].length;
            if (typeof i.metadata[j] === 'object') {
              if ([j] == 'places') {
                Object.keys(i.metadata[j]).forEach((k) => {
                  fdata[v][len - 1][j] = [];
                  fdata[v][len - 1][j].push(mongoose.Types.ObjectId(i.metadata[j][k]._id));
                  // console.log(fdata[v][len-1][j]);
                });
              } else {
                fdata[v][len - 1][j] = i.metadata[j];
              }
            } else {
              fdata[v][len - 1][j] = i.metadata[j];
            }
          });
        }
      });
    });

    // console.log(fdata);
    console.log(Object.keys(fdata.languages[0]));
    fdata.languages.forEach((l) => {
      if (Object.keys(l).indexOf('common_phrases') != -1) {
        l.common_phrases.forEach((v) => {
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

          Object.keys(v.metadata).forEach((i) => {
            v[i] = v.metadata[i];
          });

          delete v.metadata;
          delete v._id;
          delete v.slug;
          delete v.language;
        });
      }
    });

    mustCarry.collection.insert(fdata['must-carries'], (err, data) => {
      if (err) {
        console.error('error took place while adding mustCarry');
      } else {
        console.log('success while adding mustCarry');
      }
    });

    languages.collection.insert(fdata.languages, (err, data) => {
      if (err) {
        console.error('error took place');
      } else {
        console.log('success while adding languages');
      }
    });

    for (var i = 0; i < fdata.places.length; i++) {
      places.collection.insert(fdata.places[i], (err, data) => {
        if (err) {
          console.error('error took place while adding places', err);
        } else {
          console.log('success while adding places');
        }
      });
    }

    for (var i = 0; i < fdata.destinations.length; i++) {
      destinations.collection.insert(fdata.destinations[i], (err, data) => {
        if (err) {
          console.error('error took place while adding destinations', err);
        } else {
          console.log('success while adding places');
        }
      });
    }

    trips.collection.insert(fdata.trips, (err, data) => {
      if (err) {
        console.error('error in trips');
      } else {
        console.log('success while adding trips');
      }
    });

    for (var i = 0; i < fdata.experiences.length; i++) {
      experiences.collection.insert(fdata.experiences[i], (err, data) => {
        if (err) {
          console.error('error took place while adding experiences', err);
        } else {
          console.log('success while adding places');
        }
      });
    }

    res.send('fresh data has been added to the database');
  });
});

function isEmpty(val) {
  if (val === undefined || val == null || val.length <= 0) val = '';

  return val;
}

module.exports = Router;
