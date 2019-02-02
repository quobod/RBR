const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamp = require('mongoose-timestamp');

const JournalSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	body: {
		type: String,
		required: true,
		trim: true
	},
	isPublic: {
		type: Boolean,
		required: true,
		default: false
	},
	canComment: {
		type: Boolean,
		required: true,
		default: false
	},
	showComments: {
		type: Boolean,
		required: true,
		default: false
	},
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments: {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comment"
		},
		created: {
			type: Date,
			default: Date.now
		}
    }
});

JournalSchema.plugin(timestamp);

const Journal = mongoose.model('Journal', JournalSchema);

module.exports = Journal;