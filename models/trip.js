var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema({

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

   must_carry: [String],

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

    placesCovered: [String],

    experiencesCovered: [String],

    destinationsCovered: [String],

    itinerary : [{
        day: Number,
        text: String
    }]
  },{
    timestamps: true
});


var Trips = mongoose.model('Trips', tripSchema);

module.exports = Trips;
