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
            var email = req.param("email");
            User.findByEmail(email).done(function(err, usr) {
                if (err) {
                    console.log(err);
                    req.session.flash = {
                        err: err
                    };
                    return res.redirect('/user/signup');
                } else if (usr.length > 0) {
                    req.session.flash = {
                        err: {
                            error: "L'adresse email fournie est déjà enregistrée."
                        }
                    };
                    return res.redirect('/user/signup');
                } else {
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
