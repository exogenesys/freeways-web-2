var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var destinationSchema = new Schema({

	slug: {
		type: String,
		unique: true
	},

	title: String,

	img: {
		type: String
	},

	visible: {
		type: Boolean,
		default: true
	},

	img_thumb: {
		type: String
	},

	type: {
		type: String
	},

	filter: {
		type: [String]
	},

	zone: Number,

	best_months_to_visit: {
		type: [[Number]]
	},

	type: {
		type: String
	},


	best_time_to_visit: {
		type: String
	},

	best_time_to_visit_more_information: {
		type: String
	},

	caption: {
		type: String
	},

	introduction: {
		type: String
	},

	time_to_explore: {
		type: String
	},

	average_budget_per_person: {
		type: String
	},

	score: Number,
	solo_score: Number,
	family_score: Number,
	couple_score: Number,
	friends_score: Number,

	loc: [{
		type: Schema.Types.ObjectId, ref: 'NearByLoc'
	}],

	must_know: {
		type: String
	},

	how_to_reach_by_car: {
		type: String
	},

	how_to_reach_by_bus: {
		type: String
	},

	how_to_reach_by_plane: {
		type: String
	},

	how_to_reach_by_train: {
		type: String
	},

	must_carry: [{ type: Number, ref: 'mustCarry' }],

	places: [{ type: Number, ref: 'places' }],

	experiences: [{ type: Number, ref: 'experiences' }],

	trips: [{ type: Number, ref: 'trips' }],

	languages: [{ type: Number, ref: 'languages' }],

	coverPhoto: {
		type: String
	},

	getting_around_options: {
		type: [String]
	},

	getting_around: {
		type: String
	},

	keywords: {
		type: String
	}
}, { timestamps: true });

var destination = mongoose.model('Destination', destinationSchema);

module.exports = destination;
