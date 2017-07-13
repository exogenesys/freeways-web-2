var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var searchSchema = new Schema({

  slug: {
		type: String,
		unique: true
	},

  title: {
    type: String
  },

  type: {
    type: String
  },

  img: {
    type: String
  },

  img_thumb: {
    type: String
  },


  keywords: [String]


}, {timestamps: true});

searchSchema.index({keywords:'text', title:'text'});

var search = mongoose.model('search', searchSchema);

module.exports = search;
