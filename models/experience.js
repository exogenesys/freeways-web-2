var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var experienceSchema = new Schema({

    slug:{
      type:String, unique: true
    },

    title:String,

    img:{
      type:String
    },

    best_time_to_visit: {
      type: String
    },

    best_time_to_visit_more_information: {
      type: String
    },

    time_to_explore: {
  		type: String
  	},

    tags : [String] ,

    caption: {
      type: String
    },

    information: {
      type: String
    },

    loc: [{
        type: Schema.Types.ObjectId, ref: 'NearByLoc'
    }],

    must_know: {
      type: String
    },

    how_to_reach_by_walk: {
      type : String
    },

    must_carry: [String],

    cover_photo: {
      type : String
    },

    usualTimings: {
      type: String
    },

    daysOff: {
      type: String
    },

    keyWords: {
      type : String
    }

  },{
    timestamps: true
});


var experiences = mongoose.model('experiences', experienceSchema);

module.exports = experiences;
