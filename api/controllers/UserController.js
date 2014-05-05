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
    signup: function (req, res) {
        if (req.method === "POST" && req.isAjax) {
            console.log("mdr");
            var username = req.param("username"),
                password = req.param("password"),
                firstName = req.param("firstName"),
                lastName = req.param("lastName"),
                email = req.param("email");
            User.findByEmail(email).done(function(err, usr) {
                if (err) {
                    res.send({error: "DB Error"}, 500);
                } else if (usr.length > 0) {
                    res.send({error: "Email already used"}, 400);
                } else {
                    User.create({username: username, firstName: firstName, lastName: lastName, email: email, password: password}).done(function (error, user) {
                        if (error) {
                            res.send({ error: "DB Error" }, 500);
                        } else {
                            req.session.user = user;
                            res.send(user);
                        }
                    });
                }
            });
        } else {
            res.view();
        }
    },
    login: function (req, res) {
        res.view();
    }
};

module.exports = UserController;
