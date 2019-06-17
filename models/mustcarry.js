const mongoose = require('mongoose');

const { Schema } = mongoose;

const mustCarrySchema = new Schema({
  slug: {
    type: String, unique: true,

  },

  title: {
    type: String,
  },

  name: {
    type: String,
  },

  source: {
    type: String,
  },

  information: {
    type: String,
  },

}, {
  timestamps: true,
});


const mustCarry = mongoose.model('mustCarry', mustCarrySchema);

module.exports = mustCarry;
