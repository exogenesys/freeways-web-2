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

	latitude: {
		type: String
	},

	longitude: {
		type: String
	},

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

	must_carry: [String],

	places: [String],

	experiences: [String],

	trips: [String],

	languages: [String],

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
}, {timestamps: true});

var destination = mongoose.model('Destination', destinationSchema);

module.exports = destination;
