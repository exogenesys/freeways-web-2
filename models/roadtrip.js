var mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment'),
  Schema = mongoose.Schema;

const connect = mongoose.connect("mongodb://saulgoodman:hackerman@ds163561.mlab.com:63561/freeways-memory");
autoIncrement.initialize(connect);

var roadTripSchema = new Schema({

  id: {
    type: Number,
    unique: true
  },

  slug: {
    type: String,
    unique: true
  },

  name: {
    type: String
  },

  img: {
    type: String
  },

  img_thumb: {
    type: String
  },

  intro: {
    type: String
  },

  recommended_for: [{ type: String }],

  filter: [{ type: String }],

  best_time_to_visit: [[{
    type: Number
  }]],

  best_time_to_visit_more_information: {
    type: String
  },

  caption: {
    type: String
  },

  zone: Number,


  duration: {
    type: String
  },

  budget: {
    type: String
  },

  itinerary: [{
    places: [String],
    title: String,
    text: String
  }],


  items_covered: [
    {
      slug: { type: String },
      type: { type: String },
      name: { type: String },
      img: { type: String }
    }
  ],

  distance: {
    type: Number
  },

  // coordinates: [{
  //   lat: Number,
  //   long: Number
  // }],

  route_description: {
    type: String
  },

  accommodation: {
    type: String
  },

  things_to_know: {
    type: String
  },

  mode_of_transport: [{
    name: { type: String },
    icon: { type: String }
  }]
},

  { timestamps: true });

roadTripSchema.plugin(autoIncrement.plugin, { model: 'RoadTrip', field: 'id', startAt: 1, incrementBy: 1 });
var roadtrips = mongoose.model('RoadTrip', roadTripSchema);

module.exports = roadtrips;