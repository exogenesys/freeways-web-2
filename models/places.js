var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema({

    slug:{
      type:String, unique: true
    },

    title:{
      type:String
    },

    img:{
      type:String
    },

    name: {
      type: String
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

    best_time_to_visit: {
      type: String
    },

    best_time_to_visit_more_information: {
      type: String
    },

    tags : [String] ,

    loc: [{
        type: Schema.Types.ObjectId, ref: 'NearByLoc'
    }],

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

    must_carry: [String],

    experiences: [String],

    trips: [String],

    cover_photo: {
      type : String
    },

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
