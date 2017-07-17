var mongoose = require('mongoose'),
		autoIncrement = require('mongoose-auto-increment'),
		Schema = mongoose.Schema;

const connect = mongoose.connect("mongodb://saulgoodman:hackerman@ds163561.mlab.com:63561/freeways-memory");
		autoIncrement.initialize(connect);

var roadTripSchema = new Schema({

	id: {
	  type: Number,
		unique:true
	},

  slug:{
    type:String,
		unique: true
  },

  name: {
		type: String
	},

	caption: {
		type: String
	},

  duration: {
    type: String
  },

  best_time_to_visit: [{
    type: Number
  }],

  best_time_to_visit_more_information: {
      type: String
  },

  budget: {
		type: String
	},

  paragraph: {
    type: String
  },

  placesEnroute_info : [
    { place : { type: Number, ref: 'places' },
      text : { type: String }
    }
  ],

  distance: {
    type: Number
  },

  coordinates: [{
    lat : Number,
    long : Number
  }],

  route_description: {
    type: String
  },

  accommodation: {
    type: String
  },

  Things_To_Know: {
    type: String
  },

  Mode_Of_Transport: {
    type: String
  }
},

{timestamps: true});

roadTripSchema.plugin(autoIncrement.plugin, {model:'RoadTrip',field:'id',startAt:1,incrementBy:1});
var roadtrips = mongoose.model('RoadTrip', roadTripSchema);

module.exports = roadtrips;