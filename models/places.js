var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema({

    slug:{
      type:String, unique: true
    },

    title:{
      type:String
    },

    destination:{
      type:String
    },

    img:{
      type:String
    },

    img_thumb:{
      type:String
    },


    time_to_explore: {
  		type: String
  	},

    caption: {
      type: String
    },

    introduction: {
      type: String
    },

    why_should_you_go: {
      type: String
    },

    address: {
      type: String
    },

    what_should_you_know: {
      type: String
    },

    things_to_care_about: {
      type: String
    },

    speciality: {
      type: String
    },

    distance_from_city_centre: {
      type: String
    },

    best_time_to_visit: {
      type: String
    },

    price: {
      type: String
    },

    best_time_to_visit_more_information: {
      type: String
    },

    tags : [String],

    loc: {
        type: Schema.Types.ObjectId, ref: 'NearByLoc'
    },

    latitude: {
      type: Number
    },

    longitude: {
      type: Number
    },

    how_to_reach_by_car: {
      type: String
    },

    how_to_reach_by_train: {
      type: String
    },

    how_to_reach_by_plane: {
      type: String
    },

    how_to_reach_by_walk: {
      type : String
    },

    usual_timings: {
      type: String
    },

    timings_more_information: {
      type: String
    },

    days_off: {
      type: String
    },

    must_carry: [{type: Number, ref: 'mustCarry'}],

    experiences: [{type: Number, ref: 'experiences'}],

    trips: [{type: Number, ref: 'trips'}],

    must_know: {
      type : String
    },

    keywords: {
      type : String
    }

  },{
    timestamps: true
});


var places = mongoose.model('Place', placeSchema);

module.exports = places;
