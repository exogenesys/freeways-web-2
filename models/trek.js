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

  difficulty: {
    type: String
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

  Itinerary: [{ type: String }],

  Where_To_Eat: {
    type: String
  },

  Where_To_Stay: {
    type: String
  },

  Equip_Avail: {
    type: String
  },

  What_You_Should_Know: {
    type: String
  },

  Things_To_Care: {
    type: String
  },

  must_carry: [{ type: Number, ref: 'mustCarry' }],

  How_To_Reach: {
    type: String
  }

},

  { timestamps: true });

// destinationSchema.plugin(autoIncrement.plugin, { model:'Destination', field: '_id', startAt: 1, incrementBy: 1 });
trekSchema.plugin(autoIncrement.plugin, { model: 'Trek', field: 'id', startAt: 1, incrementBy: 1 });

var trek = mongoose.model('Trek', trekSchema);

module.exports = trek;