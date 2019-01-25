const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamp = require('mongoose-timestamp');

const TodoSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	completed: {
		type: Boolean,
		required: true,
		default: false
	},
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

TodoSchema.plugin(timestamp);

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;