/**
 * SessionController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {

  create: function(req, res, next) {

  	if (!req.param('email') || !req.param('password')) {
  		var emailPasswordRequiredError = [{name: 'emailPasswordRequired', message: "Vous devez entrer un email et un mot de passe"}];
  		req.session.flash = {
  			err: emailPasswordRequiredError
  		}
  		res.redirect('/user/login');
  		return;
  	}

  	User.findOneByEmail(req.param('email').toLowerCase()).done(function(err, user) {
  		if (err) return next(err);

  		if (!user) {
  			var noAccountError = [{name: 'noAccount', message: "L'adresse email" + req.param('email') + " est introuvable"}];
  			req.session.flash = {
  				err: noAccountError
  			}
  			res.redirect('/user/login');
  			return;
  		}

	  	bcrypt.compare(req.param('password'), user.password, function(err, valid) {
	  		console.log(user.password);
	  		console.log(err);
	  		if (err) return next(err);

	  		if (!valid) {
	  			var emailPasswordMismatchError = [{name: 'emailPasswordMismatch', message: "Combinaison email/mot de passe incorrecte."}];
	  			req.session.flash = {
	  				err: emailPasswordMismatchError
	  			}
	  			res.redirect('/user/login');
	  			return;
	  		}

	  		req.session.authenticated = true;
	  		req.session.User = user;

	  		res.redirect('/user/show/' + user.id);
	  	});
	});
  },

  destroy: function(req, res, next) {
  	req.session.destroy();
  	res.redirect("/user/login");
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SessionController)
   */
  _config: {}

  
};
