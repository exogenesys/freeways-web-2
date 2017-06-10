var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var languageSchema = new Schema({
    slug:String,
    name : String,
    commonPhrases : [{
      phrase : String,
      translation : String,
      source : String,
    }]
  },{
    timestamps: true
});


var languages = mongoose.model('languages', languageSchema);

module.exports =languages ;
