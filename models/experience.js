const mongoose = require('mongoose');

const { Schema } = mongoose;

const experienceSchema = new Schema({

  slug: {
    type: String,
    unique: true,
  },

  title: {
    type: String,
  },

  destination: {
    type: String,
  },

  img: {
    type: String,
  },

  img_thumb: {
    type: String,
  },

  best_time_to_visit: {
    type: String,
  },

  best_time_to_visit_more_information: {
    type: String,
  },

  time_to_explore: {
    type: String,
  },

  tags: [String],

  caption: {
    type: String,
  },

  information: {
    type: String,
  },

  loc: {
    type: Schema.Types.ObjectId,
    ref: 'NearByLoc',
  },

  why_should_you_try: {
    type: String,
  },

  what_should_you_know: {
    type: String,
  },

  latitude: {
    type: Number,
  },

  longitude: {
    type: Number,
  },

  address: {
    type: String,
  },

  things_to_care_about: {
    type: String,
  },

  distance_from_city_centre: {
    type: String,
  },

  speciality: {
    type: String,
  },

  price: {
    type: String,
  },

  must_know: {
    type: String,
  },

  how_to_reach_by_walk: {
    type: String,
  },

  how_to_reach_by_car: {
    type: String,
  },

  how_to_reach_by_train: {
    type: String,
  },

  how_to_reach_by_plane: {
    type: String,
  },

  usual_timings: {
    type: String,
  },

  timings_more_information: {
    type: String,
  },

  days_off: {
    type: String,
  },

  must_carry: [{ type: Number, ref: 'mustCarry' }],

  keywords: {
    type: String,
  },

}, { timestamps: true });

const experiences = mongoose.model('experiences', experienceSchema);

module.exports = experiences;
