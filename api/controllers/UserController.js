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
    /*
     * Creating a new user (POST request from the signup form)
     */
    create: function (req, res, next) {
        if (req.method === "POST") {
            User.create(req.params.all(), function userCreated (error, user) {
                if (error) {
                    req.session.flash = {
                        err: error
                    };

                    return res.redirect('/user/signup');
                }

                req.session.authenticated = true;
                req.session.User = user["0"];
                res.redirect('/user/show/'+user["0"].id)
            });
        } else {
            return res.redirect('/user/signup');
        }
    },
    /*
     * Displaying a user given its id (in the route)
     */
    show: function (req, res, next) {
        User.findOne(req.param('id'), function foundUser (err, user) {
            if (err) return next(err);
            if (!user) {
                return next("L'utilisateur n'existe pas.");
            }
            res.view({
                user: user
            });
        });
    },
    /*
     * Editing a user given its id (in the route)
     */
    edit: function (req, res, next) {
        User.findOne(req.param('id'), function foundUser (err, user) {
            if (err) return next(err);
            if (!user) {
                return next("L'utilisateur n'existe pas.");
            }
            res.view({
                user: user
            });
        });
    },
    /*
     * Updating a user
     */
    update: function (req, res, next) {
        User.update(req.param('id'), req.params.all(), function userUpdated (err) {
            if (err) {
                req.session.flash = {
                    err: err
                };
                return res.redirect('/user/edit/' + req.param('id'));
            }

            res.redirect('/user/show/' + req.param('id'));
        });
    },
    /*
     * Deleting a user
     */
    destroy: function (req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);

            if (!user) return next("L'utilisateur n'existe pas.");

            User.destroy(req.param('id'), function userDestroyed(err) {
                if (err) return next(err);
            });

            res.redirect('/user');
        });
    },
    /*
     * Signup view
     */
    signup: function (req, res) {
        res.view();
    },
    /*
     * List of Users
     */
    index: function (req, res) {
        res.view();
    },
    /*
     * Login view
     */
    login: function (req, res) {
        res.view();
    }
};

module.exports = UserController;
