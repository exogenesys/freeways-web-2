var mongoose = require('mongoose'),
	autoIncrement = require('mongoose-auto-increment'),
	Schema = mongoose.Schema;

const connect = mongoose.connect("mongodb://saulgoodman:hackerman@ds163561.mlab.com:63561/freeways-memory");
autoIncrement.initialize(connect);


var tripSchema = new Schema({

	id: {
		type: Number,
		unique: true
	},

	slug: {
		type: String,
		unique: true
	},

	img: {
		type: String
	},

	img_thumb: {
		type: String
	},

	name: {
		type: String
	},

	type: {
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

	recommended_for: [{ type: String }],

	filter: [{ type: String }],

	best_time_to_visit: [{
		type: Number
	}],

	latitude: Number,

	longitude: Number,

	zone: Number,

	best_time_to_visit_more_information: {
		type: String
	},

	duration: {
		type: String
	},

	how_to_reach: {
		type: String
	},

	itinerary: [{
		places: [String],
		title: String,
		text: String
	}],

	places: [{ type: Number, ref: 'places' }],

	destinations: [{ type: Number, ref: 'destinations' }],

	experiences: [{ type: Number, ref: 'experiences' }],

	must_carry: [{ type: Number, ref: 'mustCarry' }],

	accommodation: {
		type: String
	},

	things_to_know: {
		type: String
	}
},

	{ timestamps: true });

tripSchema.plugin(autoIncrement.plugin, { model: 'Trip', field: 'id', startAt: 1, incrementBy: 1 });
var trip = mongoose.model('Trip', tripSchema);

module.exports = trip;