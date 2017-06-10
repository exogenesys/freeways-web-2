var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var destinationSchema = new Schema({

    bestTimeToVisit: {
      type: String
    },

    bestTimeToVisitMoreInfo: {
      type: String
    },

    caption: {
      type: String
    },

    introduction: {
      type: String
    },

    timeToExplore: {
      type: String
    },

    avgBudgetPerPerson: {
      type: String
    },

    latitude: {
      type: String
    },

    longitude: {
      type: String
    },

    mustKnow: {
      type: String
    },

    howToReachByCar: {
      type: String
    },

    howToReachByBus: {
      type: String
    },

    howToReachByPlane: {
      type: String
    },

    howToReachByTrain: {
      type: String
    },

    mustCarry: [{
      type: Schema.Types.ObjectId, ref: 'MustCarry'
    }],

    places: [{
      type: Schema.Types.ObjectId, ref: 'Place'
    }],

    experiences: [{
      type : Schema.Types.ObjectId, ref: 'Experience'
    }],

    trips: [{
      type : Schema.Types.ObjectId, ref: 'Trip'
    }],

    languages: [{
      type : Schema.Types.ObjectId, ref: 'Language'
    }],

    coverPhoto: {
      type : String
    },

    gettingAround: {
      type : String
    },

    keyWords: {
      type : String
    },

    comments: [{

      type : String

      userID: {
        type: Schema.Types.ObjectId
      },

      parentComment: {
        type: Schema.Types.ObjectId
        default: false
      },

      childComment: {
        type: [{
          type: Schema.Types.ObjectId
        }],
        default:false
      }
    }]

  },{
    timestamps: true
});


var destination = mongoose.model('Destination', destinationSchema);

module.exports = destination;
