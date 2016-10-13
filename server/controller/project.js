var express = require('express'),
    router = express.Router();
//var db = require('../database/db');
db1 = require('../helper/connectdb.js');
router.post('/', function(req, res) {

    var str = req.body.email;
    var res1 = str.split("@", 1);
    var proName = res1 + "." + req.body.pro;
    console.log(proName);
    console.log(req.body.email);
    var coll = db1.getDb().collection('raju');

  var db = db1.getDb().collection("userData");
    db.findOne({
        email: req.body.email,
        project: {
            "name": proName
        }

    }, function(err, existingUser) {
        if (existingUser) {
            console.log("found");
            console.log(existingUser);
            //db.collection.find({ "project" : { "$elemMatch" : { "name" : req.body.pro} }});
            res.send('project is already available');
        } else {
            console.log("not found");
            db.update({
                "email": req.body.email
            }, {
                "$push": {
                    "project": {
                        "nameForDb": proName,
                        "nameForUser":req.body.pro
                    }
                }
            });
            db1.getDb().createCollection(proName, function(err, collection){
             if (err) throw err;
              res.send('project is created successfully');
          });
        }
    });


});
module.exports = router;
