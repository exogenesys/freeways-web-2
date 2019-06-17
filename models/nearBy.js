const mongoose = require('mongoose');

const { Schema } = mongoose;

const NearBySchema = new Schema({

  slug: {
    type: String,
  },

  type: String,

  loc: {
    type: [Number], // [<longitude>, <latitude>]
    index: '2d', // create the geospatial index
  },

});


const nearLoc = mongoose.model('NearByLoc', NearBySchema);

module.exports = nearLoc;
