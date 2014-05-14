/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  adapter: 'neo4j',

  schema: true,

  attributes: {
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    username: {
      type: 'string',
      minLength: 5,
      maxLength: 30,
      required: true
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
    attrs.email = attrs.email.toLowerCase();
  	bcrypt.genSalt(10, function(err, salt) {
  		if (err) return next(err);
  		bcrypt.hash(attrs.password, salt, null, function(err, hash) {
  			if (err) return next(err);
  			attrs.password = hash;
  			next();
  		});
  	});
  },

  afterCreate: function (newlyInsertedRecord, next) {
    console.log(newlyInsertedRecord);
    next();
  }

};
