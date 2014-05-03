/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  adapter: 'neo4j',

  attributes: {
    firstName: {
      type: 'string',
      maxLength: 30,
      required: true
    },
    lastName: {
      type: 'string',
      maxLength: 30,
      required: true
    },
    nickName: {
      type: 'string',
      maxLength: 30,
      required: false
    },
    birthDate: {
      type: 'date',
      required: false
    },
    email: {
      type: 'email',
      required: true
    },
    password: {
    	type: 'string',
    	required: true
    }
  },

  beforeCreate: function (attrs, next) {
  	var bcrypt = require('bcrypt-nodejs');

  	bcrypt.genSalt(10, function(err, salt) {
  		if (err) return next(err);
  		bcrypt.hash(attrs.password, salt, null, function(err, hash) {
  			if (err) return next(err);
  			attrs.password = hash;
  			next();
  		});
  	});
  }

};
