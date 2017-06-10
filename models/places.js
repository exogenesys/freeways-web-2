var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema({

    slug:{
      type:String
    },

    title:{
      type:String
    },

    name: {
      type: String
    },

    caption: {
      type: String
    },

    introduction: {
      type: String
    },

    best_time_to_visit: {
      type: String
    },

    best_time_to_visit_more_information: {
      type: String
    },

    tags : [String] ,

    latitude: {
      type: String
    },

    longitude: {
      type: String
    },

    how_to_reach_by_car: {
      type: String
    },

    how_to_reach_by_train: {
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

    must_carry: [{
      type: Schema.Types.ObjectId, ref: 'mustCarry'
    }],

    experiences: [{
      type : Schema.Types.ObjectId, ref: 'experiences'
    }],

    trips: [{
      type : Schema.Types.ObjectId, ref: 'Trips'
    }],

    cover_photo: {
      type : String
    },

    must_know: {
      type : String
    },

    keyWords: {
      type : String
    }

  },{
    timestamps: true
});


var places = mongoose.model('Place', placeSchema);

module.exports = places;
