var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mustCarrySchema = new Schema({
    slug:{
      type:String, unique: true
      
    },

    title:{
      type:String,
    },

    name: {
      type: String
    },

    source: {
      type: String
    },

    information: {
      type: String
    }

  },{
    timestamps: true
});


var mustCarry = mongoose.model('mustCarry', mustCarrySchema);

module.exports = mustCarry;
