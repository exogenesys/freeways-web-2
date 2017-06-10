var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mustCarrySchema = new Schema({

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


var mustcarry = mongoose.model('MustCarry', mustCarrySchema);

module.exports = mustcarry;
