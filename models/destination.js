var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var destinationSchema = new Schema({

    slug:{
      type:String, unique: true
    },

    title:String,

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

    must_carry: [{
      type: Schema.Types.ObjectId, ref: 'mustCarry'
    }],

    places: [{
      type: Schema.Types.ObjectId, ref: 'Place'
    }],

    experiences: [{
      type : Schema.Types.ObjectId, ref: 'experiences'
    }],

    trips: [{
      type : Schema.Types.ObjectId, ref: 'Trips'
    }],

    languages: [{
      type : Schema.Types.ObjectId, ref: 'languages'
    }],

    coverPhoto: {
      type : String
    },

    gettingAround: {
      type : String
    },

    keyWords: {
      type : String
    }
  },{
    timestamps: true
});


var destination = mongoose.model('Destination', destinationSchema);

module.exports = destination;
