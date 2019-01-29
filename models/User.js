const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    googleID: {
        type: String
    },
	facebookID: {
		type: String
	},
	githubID: {
		type: String
	},
	profileId: {
		type: String
	},
    email: {
        type: String,
		unique: true,
		index: true,
		required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
	middleName: {
		type: String
	},
	nickName: {
		type: String
	},
	userName: {
		type: String
	},
	displayName: {
		type: String
	},
	profileUrl: {
		type: String
	},
    image: {
        type: String
    },
    gender: {
        type: String
    },
	provider: {
		type: String
	},
	raw: {
		type: String
	},
	password: {
		type: String
	},
	accessToken: {
		type: String
	},
	refreshToken: {
		type: String
	},
	password: {
		type: String
	}
});

UserSchema.methods.withoutPassword = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

// Create collection and add schema
const User = mongoose.model('User', UserSchema);
module.exports = User;