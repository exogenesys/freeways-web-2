var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema({

    name: {
      type: String
    },

    caption: {
      type: String
    },

    introduction: {
      type: String
    },

    bestTimeToVisit: {
      type: String
    },

    bestTimeToVisitMoreInfo: {
      type: String
    },

    tags : [String] ,

    latitude: {
      type: String
    },

    longitude: {
      type: String
    },

    howToReachByCar: {
      type: String
    },

    howToReachByTrain: {
      type: String
    },

    howToReachByBus: {
      type: String
    },

    howToReachByPlane: {
      type: String
    },

    howToReachByWalk: {
      type : String
    },

    mustCarry: [{
      type: Schema.Types.ObjectId, ref: 'MustCarry'
    }],

    experiences: [{
      type : Schema.Types.ObjectId, ref: 'Experience'
    }],

    trips: [{
      type : Schema.Types.ObjectId, ref: 'Trip'
    }],

    coverPhoto: {
      type : String
    },

    mustKnow: {
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
