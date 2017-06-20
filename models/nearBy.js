var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NearBySchema = new Schema({

    slug: {
      type:String
    },

    loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'      // create the geospatial index
    }

});


var nearLoc = mongoose.model('NearByLoc', NearBySchema);

module.exports = nearLoc;
