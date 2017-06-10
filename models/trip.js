var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema({

  slug:String,

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

   timeToExplore: {
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

   must_carry: [{
      type: Schema.Types.ObjectId, ref: 'mustCarry'
    }],

   cover_photo: {
      type : String
    },

   gettingAround: {
      type : String
    },

   keyWords: {
      type : String
    },

    tags: [String],

    placesCovered: [{type : Schema.Types.ObjectId, ref: 'Place'}],

    experiencesCovered: [{type : Schema.Types.ObjectId, ref: 'experiences'}],

    destinationsCovered: [{type : Schema.Types.ObjectId, ref: 'Destination'}],

    itinerary : [{
        day: Number,
        text: String
    }]
  },{
    timestamps: true
});


var Trips = mongoose.model('Trips', tripSchema);

module.exports = Trips;
