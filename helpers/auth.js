module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        // req.flash('error_message', 'Not Authorized');
        res.redirect('/signin')
    },	
    ensureGuest: function(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/api');
        } else {
			return next();
		}
    }
}