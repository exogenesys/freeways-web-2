const mongoose = require('mongoose');

const { Schema } = mongoose;

const languageSchema = new Schema({
  slug: {
    type: String, unique: true,
  },
  name: String,
  commonPhrases: [{
    phrase: String,
    translation: String,
    source: String,
  }],
}, {
  timestamps: true,
});


const languages = mongoose.model('languages', languageSchema);

module.exports = languages;
