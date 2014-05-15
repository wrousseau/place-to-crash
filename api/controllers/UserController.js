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
    create: function (req, res, next) {
        if (req.method === "POST") {
            User.create(req.params.all(), function userCreated (error, user) {
                if (error) {
                    console.log(error);
                    req.session.flash = {
                        err: error
                    };

                    return res.redirect('/user/signup');
                }
                    
                res.redirect('/user/show/'+user["0"].id)
            });
        } else {
            return res.redirect('/user/signup');
        }
    },
    show: function (req, res, next) {
        User.findOne(req.params['id'], function foundUser (err, user) {
            if (err) return next(err);
            if (!user) {
                console.log("none found...");
                return next();
            }
            res.view({
                user: user
            });
        });
    },
    signup: function (req, res) {
        res.view();
    },
    userslist: function (req, res) {
        res.view();
    },
    login: function (req, res) {
        res.view();
    }
};

module.exports = UserController;
