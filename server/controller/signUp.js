/*
 |--------------------------------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------------------------------
 */
 var jwt = require('jwt-simple');
 var moment = require('moment');

 var config = require('../config');

 var express = require('express'),
  router = express.Router();
var db = require('../database/db');
router.post('/signup', function(req, res) {
    db.User.findOne({
        email: req.body.email
    }, function(err, existingUser) {
        if (existingUser) {
            res.status(409).send({
                message: 'Email is already taken'
            });
        } else {
            var user = new db.User({
                displayName: req.body.displayName,
                email: req.body.email,
                password: req.body.password
            });
            user.save(function(err, result) {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                } else {
                    db.User.findOne({
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

    });
});
module.exports=router;
