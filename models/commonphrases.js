const mongoose = require('mongoose');

const { Schema } = mongoose;

const commonphrasesSchema = new Schema({

  slug: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },

  commonphrases: [String],

}, { timestamps: true });

const cphrases = mongoose.model('CommonPhrases', commonphrasesSchema);

module.exports = cphrases;
