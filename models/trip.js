var mongoose = require('mongoose'),
		autoIncrement = require('mongoose-auto-increment'),
		Schema = mongoose.Schema;

const connect = mongoose.connect("mongodb://saulgoodman:hackerman@ds163561.mlab.com:63561/freeways-memory");
		autoIncrement.initialize(connect);


var tripSchema = new Schema({

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

	intro: {
		type: String
	},

	budget: {
		type: String
	},

	recommended_for: [{type: String}],

	filters: [{type: String}],

	best_time_to_visit: [{
    type: Number
  }],

  best_time_to_visit_more_information: {
      type: String
  },

	duration: {
		type: String
	},

	how_to_reach: {
		type: String
	},

	itinerary: [{type: String}],

	coordinates: [{
    lat : Number,
    long : Number
  }],

	places: [{type:Number, ref:'places'}],

	must_carry: [{type:Number, ref:'mustCarry'}],

	accommodation: {
		type: String
	},

	Things_To_Know: {
		type: String
  }
},

{timestamps: true});

tripSchema.plugin(autoIncrement.plugin, {model:'Trip',field:'id',startAt:1,incrementBy:1});
var trip = mongoose.model('Trip', tripSchema);

module.exports = trip;