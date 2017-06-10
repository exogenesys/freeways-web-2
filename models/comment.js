var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CommentSchema = new Schema({

  type : String

  userID: {
    type: Schema.Types.ObjectId
  },

  parentComment: {
    type: Schema.Types.ObjectId
    default: false
  },

  childComment: {
    type: [{
      type: Schema.Types.ObjectId
    }],
    default:false
  }

  },{
        timestamps: true
});


module.exports = mongoose.model('Comments', CommentSchema);
