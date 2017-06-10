var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commonphrasesSchema = new Schema({

	slug: {
		type: String,
		unique: true
	},
	name: {
		type: String
	},

	commonphrases: [String]

}, {timestamps: true});

var cphrases = mongoose.model('CommonPhrases', commonphrasesSchema);

module.exports = cphrases;
