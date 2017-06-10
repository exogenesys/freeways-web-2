var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CommentSchema = new Schema({

	type: String,

	slug: {
		type: String,
		unique: true
	},

	userID: {
		type: Schema.Types.ObjectId
	},

	parentComment: {
		type: Schema.Types.ObjectId default: false
	},

	childComment: {
		type: [
			{
				type: Schema.Types.ObjectId
			}
		],
		default: false
	}

}, {timestamps: true});

module.exports = mongoose.model('Comments', CommentSchema);
