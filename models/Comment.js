const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamp = require('mongoose-timestamp');

const CommentSchema = new Schema({
	body: {
		type: String,
		required: true,
		trim: true
	},
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

CommentSchema.plugin(timestamp);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;