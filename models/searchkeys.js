const mongoose = require('mongoose');

const { Schema } = mongoose;
const searchSchema = new Schema({

  slug: {
    type: String,
    unique: true,
  },

  title: {
    type: String,
  },

  type: {
    type: String,
  },

  img: {
    type: String,
  },

  img_thumb: {
    type: String,
  },


  keywords: [String],


}, { timestamps: true });

searchSchema.index({ keywords: 'text', title: 'text' });

const search = mongoose.model('search', searchSchema);

module.exports = search;
