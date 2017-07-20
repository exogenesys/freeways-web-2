var mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment'),
  Schema = mongoose.Schema;

const connect = mongoose.connect("mongodb://saulgoodman:hackerman@ds163561.mlab.com:63561/freeways-memory");
autoIncrement.initialize(connect);

var trekSchema = new Schema({

  id: {
    type: Number,
    unique: Number
  },

  slug: {
    type: String,
    unique: true
  },

  name: {
    type: String
  },

  caption: {
    type: String
  },

  difficulty: {
    type: Number
  },

  duration: {
    type: String
  },

  max_altitude: {
    type: Number
  },

  region: {
    type: String
  },

  base_camp_lat: {
    type: Number
  },

  base_camp_lng: {
    type: Number
  },

  base_camp_name: {
    type: String
  },

  summit_lat: {
    type: Number
  },

  summit_lng: {
    type: Number
  },

  summit_name: {
    type: String
  },

  dist_from_nearest_major_city: {
    type: Number
  },

  no_of_days_trekking: {
    type: Number
  },

  coordinates: [{
    lat: Number,
    long: Number
  }],

  best_time_to_visit: [{
    type: Number
  }],

  best_time_to_visit_more_information: {
    type: String
  },

  trek_distance: {
    type: Number
  },

  budget: {
    type: Number
  },

  for_whom: {
    type: String
  },

  highlights: [{
    Url: String,
    Text: String
  }],

  why: {
    type: String
  },

  itinerary: [{ type: String }],

  where_to_eat: {
    type: String
  },

  where_to_stay: {
    type: String
  },

  equip_avail: {
    type: String
  },

  what_you_should_know: {
    type: String
  },

  things_to_care: {
    type: String
  },

  must_carry: [{ type: Number, ref: 'mustCarry' }],

  how_to_reach: {
    type: String
  }

},

  { timestamps: true });

// destinationSchema.plugin(autoIncrement.plugin, { model:'Destination', field: '_id', startAt: 1, incrementBy: 1 });
trekSchema.plugin(autoIncrement.plugin, { model: 'Trek', field: 'id', startAt: 1, incrementBy: 1 });

var trek = mongoose.model('Trek', trekSchema);

module.exports = trek;