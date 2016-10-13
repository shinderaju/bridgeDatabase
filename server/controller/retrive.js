var express = require('express'),
    router = express.Router();
var db = require('../database/db');
router.post('/', function(req, res) {
    var key = req.body.key;
    var db = db1.getDb().collection("userData");
      db.findOne({
          email: req.body.email
      }, function(err, existingUser) {
        console.log(existingUser);
        res.send(existingUser.project);
          // if (existingUser) {
          //     console.log("found");
          //     //db.collection.find({ "project" : { "$elemMatch" : { "name" : req.body.pro} }});
          //     res.send('project is already available');
          // } else {
          //     console.log("not found");
          //     db.update({
          //         "email": req.body.email
          //     }, {
          //         "$push": {
          //             "project": {
          //                 "name": proName
          //             }
          //         }
          //     });
          //     db1.getDb().createCollection(proName, function(err, collection){
          //      if (err) throw err;
          //       res.send('project is created successfully');
          //   });
          // }
      });
    // db.project.find({
    //     key: key
    // }, function(err, projectRe) {
    //     if (err) {
    //         res.send('Error');
    //         //console.log(err);
    //     } else {
    //
    //         //console.log(projectRe);
    //         res.send(projectRe);
    //     }
    //     console.log("print user");
    //     // res.send(user);
    // })
});
module.exports = router;
