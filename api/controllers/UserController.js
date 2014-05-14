/**
 * UserController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
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

var UserController = {
    create: function (req, res) {
        if (req.method === "POST") {
            console.log("creating");
            var email = req.param("email").toLowerCase();
            User.find()
            .where({ or: [{email: email}, {username: {"~=":req.param("username")}}]})
            .done(function(err, usr) {
                if (err) {
                    console.log(err);
                    req.session.flash = {
                        err: err
                    };
                    return res.redirect('/user/signup');
                } else if (usr.length > 0) {
                    console.log("already present !");
                    req.session.flash = {
                        err: {
                            error: "L'adresse email ou le nom d'utilisateur fournis sont déjà utilisés."
                        }
                    };
                    return res.redirect('/user/signup');
                }
            });

            User.create(req.params.all(), function userCreated (error, user) {
                if (error) {
                    console.log(error);
                    req.session.flash = {
                        err: error
                    };

                    return res.redirect('/user/signup');
                }

                res.json(user);
                req.session.flash = {};
            });
        }
    },
    signup: function (req, res) {
        res.locals.flash = _.clone(req.session.flash);
        res.view();
        req.session.flash = {};
    },
    login: function (req, res) {
        res.view();
    }
};

module.exports = UserController;
