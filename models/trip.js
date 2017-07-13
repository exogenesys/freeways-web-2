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

    loc: [{
        type: Schema.Types.ObjectId, ref: 'NearByLoc'
    }],
    
   must_know: {
      type: String
    },

   must_carry: [{type: Number, ref:"mustCarry"}],

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


    places: [{type:Number ,ref:"places"}],

    experiences: [{type: Number, ref: 'experiences'}],

    destinations: [{type: Number, ref: 'destinations'}],

    itinerary : [{
        day: Number,
        text: String
    }]
  },{
    timestamps: true
});


var Trips = mongoose.model('Trips', tripSchema);

module.exports = Trips;
