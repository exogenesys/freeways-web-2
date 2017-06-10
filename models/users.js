var mongoose = require('mongoose'),
Schema = mongoose.Schema,
passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({

  slug: {
    type:String, unique: true
  },

  username: {
    type: String
  },

  password: {
    type: String
  },

  image: {
    type: String
  },

  places: [{
      type: Schema.Types.ObjectId, ref: 'Places'
    }],

  admin: {
            type: Boolean,
            default: false
  },

  experiences: [{
      type: Schema.Types.ObjectId, ref: 'Experiences'
    }],

  destinations: [{
        type: Schema.Types.ObjectId, ref: 'Destinations'
    }],

  comments: [{
          type: Schema.Types.ObjectId, ref: 'Comments'
      }]

    },{
        timestamps: true
});


User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
