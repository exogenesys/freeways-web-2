var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var experienceSchema = new Schema({

    bestTimeToVisit: {
      type: String
    },

    bestTimeToVisitMoreInfo: {
      type: String
    },

    tags : [String] ,

    caption: {
      type: String
    }

    information: {
      type: String
    }

    latitude: {
      type: String
    },

    longitude: {
      type: String
    },

    mustKnow: {
      type: String
    }

    howToReachByWalk: {
      type : String
    },

    mustCarry: [{
      type: Schema.Types.ObjectId, ref: 'MustCarry'
    }],

    coverPhoto: {
      type : String
    },

    usualTimings: {
      type: String
    }

    daysOff: {
      type: String
    }

    keyWords: {
      type : String
    }

  },{
    timestamps: true
});


var places = mongoose.model('Place', placeSchema);

module.exports = places;
