/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
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
        },
        online: {
            type: 'boolean',
            defaultsTo: false
        }
    },

    /*
     * When creating a user profile,
     * the password and password confirmation must match,
     * the password is hashed, and
     * the username or email cannot be set to values already used by another user
     */
    beforeCreate: function (attrs, next) {
        attrs.email = attrs.email.toLowerCase();
        if (attrs.password !== attrs.passwordConfirmation)
            return next({error: "Les deux mots de passe entrés ne correspondent pas."});
        
        var bcrypt = require('bcrypt-nodejs');
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(attrs.password, salt, null, function(err, hash) {
                if (err) return next(err);
                attrs.password = hash;
            });
        });

        User.find()
        .where({ or: [{email: attrs.email}, {username: {"~=":attrs.username}}]})
        .done(function(err, usr) {
            if (err) return next(err);
            else if (usr.length > 0) return next({error: "L'adresse email ou le nom d'utilisateur fournis sont déjà utilisés."});
            next();
        });
    },

    /*
     * When editing a user profile's email or username, they cannot be changed to 
     * values already used by another user
     */
    beforeUpdate: function (attrs, next) {
        if (!attrs.hasOwnProperty("email") || !attrs.hasOwnProperty("username"))
            return next();
        User.find()
        .where({ or: [{email: attrs.email}, {username: {"~=":attrs.username}}]})
        .done(function(err, usr) {
            if (err) return next(err);
            else if (usr.length > 0) {
                for (i = 0; i < usr.length; ++i) {
                    if (usr[i].id !== attrs.id) return next({error: "L'adresse email ou le nom d'utilisateur fournis sont déjà utilisés."});
                }
            } 
            next();
        });
    },

};
