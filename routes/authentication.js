const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.authenticate = (emailOrUsername, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await User.findOne({ $or: [ { email: emailOrUsername }, { userName: emailOrUsername } ] });			
			// Match Password 
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err) throw err;
				
				if (isMatch) {
					resolve(user);
				} else {
					reject('Authentication Failed');
				}
			});
		} catch (err) {
			// Email not found 
			reject('Authentication Failed');
		}
	});
};