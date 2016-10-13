/*
 |--------------------------------------------------------------------------
 | Log in with Email
 |--------------------------------------------------------------------------
 */

var jwt = require('jwt-simple');
var moment = require('moment');
var mongodb = require('mongodb');
var bcrypt = require('bcryptjs');
var config = require('../config');
// Require the bcrypt package
var bcrypt = require('bcrypt');

// Create a password salt
var salt = bcrypt.genSaltSync(10);


var express = require('express'),
    router = express.Router();
//var db = require('../database/db');
db = require('../helper/connectdb.js');
var jwt = require('jwt-simple');
/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
}

router.post('/login', function(req, res) {
    var coll = db.getDb().collection('userData');
    coll.findOne({
        email: req.body.email,
    }, function(err, existingUser) {
        if (existingUser) {
            if (bcrypt.compareSync(req.body.password, existingUser.password)) {
                // var str = req.body.email;
                // var dbName = str.split("@", 1);
                // console.log(dbName[0]);
                res.send({
                    user: existingUser,
                    token: createJWT(existingUser)
                });
            } else {
                console.log("Invalid  password");
                return res.status(401).send({
                    message: 'Invalid password'
                });
            }
        } else {
            console.log("Invalid email");
            return res.status(401).send({
                message: 'Invalid email '
            });
        }
    });
});






// db.User.findOne({
//     email: req.body.email
// }, '+password', function(err, user) {
//     if (!user) {
//         return res.status(401).send({
//             message: 'Invalid email and/or password'
//         });
//     } else {
//         // res.send(user)
//         user.comparePassword(req.body.password, function(err, isMatch) {
//             if (!isMatch) {
//                 return res.status(401).send({
//                     message: 'Invalid email and/or password'
//                 });
//             }
//             res.send({
//                 user: user,
//                 token: createJWT(user)
//             });
//         });
//     }
//
// });


/*
 |--------------------------------------------------------------------------
 | Login with Google
 |--------------------------------------------------------------------------
 */
router.post('/google', function(req, res) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, {
        json: true,
        form: params
    }, function(err, response, token) {
      var coll = db.getDb().collection('userData');
        var accessToken = token.access_token;
        var headers = {
            Authorization: 'Bearer ' + accessToken
        };

        // Step 2. Retrieve profile information about the current user.
        request.get({
            url: peopleApiUrl,
            headers: headers,
            json: true
        }, function(err, response, profile) {
            if (profile.error) {
                return res.status(500).send({
                    message: profile.error.message
                });
            }
            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                coll.findOne({
                    google: profile.sub
                }, function(err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({
                            message: 'There is already a Google account that belongs to you'
                        });
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.TOKEN_SECRET);
                    coll.findById(payload.sub, function(err, user) {
                        if (!user) {
                            return res.status(400).send({
                                message: 'User not found'
                            });
                        }
                        user.google = profile.sub;
                        user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
                        user.displayName = user.displayName || profile.name;
                        coll.insertOne(user,function() {
                            var token = createJWT(user);
                            res.send({
                                token: token
                            });
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                coll.findOne({
                    google: profile.sub
                }, function(err, existingUser) {
                    if (existingUser) {
                        return res.send({
                            existingUser: existingUser,
                            token: createJWT(existingUser)
                        });
                    }
                    var user = new db.User();
                    user.google = profile.sub;
                    user.picture = profile.picture.replace('sz=50', 'sz=200');
                    user.displayName = profile.name;
                    coll.insertOne(user,function(err) {
                        var token = createJWT(user);

                        res.send({
                            existingUser: existingUser,
                            token: token
                        });

                    });
                });
            }
        });
    });
});


/*
 |--------------------------------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------------------------------
 */
router.post('/signup', function(req, res) {
            console.log("hi");
            var coll = db.getDb().collection('userData');
            coll.findOne({
                email: req.body.email
            }, function(err, existingUser) {
                if (existingUser) {
                    res.status(409).send({
                        message: 'Email is already taken'
                    });
                } else {
                    console.log(req.body.password);
                    var passwordToSave = bcrypt.hashSync(req.body.password, salt);
                    console.log("passwordToSave ");
                    console.log(passwordToSave);
                    coll.insertOne({
                        displayName: req.body.displayName,
                        email: req.body.email,
                        password: passwordToSave,
                        project:[]
                    }, function(err, result) {
                        if (err) {
                            res.status(500).send({
                                message: err.message
                            });
                        } else {
                            coll.findOne({
                                email: req.body.email
                            }, function(err, existingUser) {
                                res.send({
                                    existingUser: existingUser,
                                    token: createJWT(result)
                                });
                            });
                        }
                    });
                }
            })

});
module.exports = router;
